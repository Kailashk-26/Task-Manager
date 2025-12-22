import express from "express";
import {
  assignedTasks,
  createdTasks,
  createTask,
  deleteTask,
  editTask,
  overdueTasks,
  updateStatus,
} from "../controllers/taskController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const taskRoute = express.Router();

taskRoute.post("/create", protect, createTask);
taskRoute.put("/edit/:id", protect, editTask);
taskRoute.put("/status/:id", protect, updateStatus);
taskRoute.delete("/delete/:id", protect, deleteTask);
taskRoute.get("/created", protect, createdTasks);
taskRoute.get("/assigned", protect, assignedTasks);
taskRoute.get("/overdue", protect, overdueTasks);

export default taskRoute;
