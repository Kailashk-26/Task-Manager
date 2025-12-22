import { Response } from "express";
import { Types } from "mongoose";
import TaskModel from "../models/Task.ts";
import User from "../models/User.ts";
import { AuthRequest } from "../middleware/authMiddleware.ts";
import { getIO } from "../configs/socket.ts";

import {
  createTaskSchema,
  editTaskSchema,
  updateStatusSchema,
} from "../validators/taskValidators.ts";


export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createTaskSchema.parse(req.body);

    if (!Types.ObjectId.isValid(parsed.assignedToId)) {
      return res.status(400).json({ message: "Invalid assigned user" });
    }

    const assignedUser = await User.findById(parsed.assignedToId);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const task = await TaskModel.create({
      ...parsed,
      dueDate: new Date(parsed.dueDate),
      creatorId: req.user!.userId,
    });

    // notify assigned user
    const io = getIO();
    io.to(parsed.assignedToId).emit("task-assigned", task);

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.errors ?? err.message });
  }
};

export const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = editTaskSchema.parse(req.body);

    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.creatorId.toString() !== req.user!.userId) {
      return res.status(403).json({ message: "Only creator can edit task" });
    }

    const previousAssignedTo = task.assignedToId.toString();

    Object.assign(task, {
      ...parsed,
      ...(parsed.dueDate && { dueDate: new Date(parsed.dueDate) }),
    });

    await task.save();

    const io = getIO();

    // currently assigned user
    io.to(task.assignedToId.toString()).emit("task-updated", task);

    // notify new user separately
    if (
      parsed.assignedToId &&
      parsed.assignedToId !== previousAssignedTo
    ) {
      io.to(parsed.assignedToId).emit("task-assigned", task);
    }

    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.errors ?? err.message });
  }
};


export const updateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = updateStatusSchema.parse(req.body);

    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedToId.toString() !== req.user!.userId) {
      return res
        .status(403)
        .json({ message: "Only assigned user can update status" });
    }

    task.status = status;
    await task.save();

    //notify creator
    const io = getIO();
    io.to(task.creatorId.toString()).emit("status-updated", task);

    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.errors ?? err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.creatorId.toString() !== req.user!.userId) {
    return res.status(403).json({ message: "Only creator can delete task" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};

export const createdTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskModel.find({ creatorId: req.user!.userId })
    .populate("assignedToId", "name email")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

export const assignedTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskModel.find({ assignedToId: req.user!.userId })
    .populate("creatorId", "name email")
    .sort({ dueDate: 1 });

  res.json(tasks);
};

export const overdueTasks = async (req: AuthRequest, res: Response) => {
  const today = new Date();

  const tasks = await TaskModel.find({
    assignedToId: req.user!.userId,
    dueDate: { $lt: today },
    status: { $ne: "Completed" },
  }).sort({ dueDate: 1 });

  res.json(tasks);
};
