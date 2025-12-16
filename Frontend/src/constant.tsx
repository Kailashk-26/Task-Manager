// Task Priority values
export const TaskPriority = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
  Urgent: "Urgent",
} as const;

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];

// Task Status values
export const TaskStatus = {
  ToDo: "To Do",
  InProgress: "In Progress",
  Review: "Review",
  Completed: "Completed",
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  jobPosition: string;
}

// Task interface
export interface Task {
  id: string;
  title: string; // max 100 chars
  description: string; // multi-line
  dueDate: string; // ISO date string
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: string;
  assignedToId: string;
}

// Dummy users data
export const users: User[] = [
  {
    id: "u1",
    name: "Kailash",
    email: "kailash@example.com",
    jobPosition: "Frontend Developer",
  },
  {
    id: "u2",
    name: "Ananya",
    email: "ananya@example.com",
    jobPosition: "Backend Developer",
  },
  {
    id: "u3",
    name: "Rahul",
    email: "rahul@example.com",
    jobPosition: "Project Manager",
  },
];

// Dummy tasks data
export const tasks: Task[] = [
  {
    id: "t1",
    title: "Design Login Page",
    description: "Create a responsive login page UI.\nUse Tailwind CSS for styling.",
    dueDate: "2025-01-10T10:00:00Z",
    priority: TaskPriority.Medium,
    status: TaskStatus.ToDo,
    creatorId: "u3",
    assignedToId: "u1",
  },
  {
    id: "t2",
    title: "API for Task Management",
    description: "Implement CRUD APIs for tasks.\nEnsure proper validation and error handling.",
    dueDate: "2025-01-15T15:30:00Z",
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    creatorId: "u3",
    assignedToId: "u2",
  },
  {
    id: "t3",
    title: "Testing & Review",
    description: "Write unit tests for task module.\nReview code and fix bugs if any.",
    dueDate: "2025-01-20T18:00:00Z",
    priority: TaskPriority.Urgent,
    status: TaskStatus.Review,
    creatorId: "u2",
    assignedToId: "u1",
  },
];