import express from "express";
import {
  assignedTasks,
  createdTasks,
  createTask,
  deleteTask,
  editTask,
  getDetail,
  overdueTasks,
  updateStatus,
} from "../controllers/taskController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const taskRoute = express.Router();

taskRoute.post("/create", protect, createTask);
taskRoute.put("/edit/:id", protect, editTask);
taskRoute.put("/status/:id", protect, updateStatus);
taskRoute.delete("/del/:id", protect, deleteTask);
taskRoute.get("/created", protect, createdTasks);
taskRoute.get("/assigned", protect, assignedTasks);
taskRoute.get("/overdue", protect, overdueTasks);
taskRoute.get("/details/:id", protect, getDetail);

export default taskRoute;
