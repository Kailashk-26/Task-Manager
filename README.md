# 🗂️ Task Manager Web Application

A full-stack **Task Manager Web Application** designed to help users create, assign, and manage tasks efficiently with **real-time updates and notifications**.  
This project is built using modern technologies with a strong focus on **type safety**, **validation**, and **clean architecture**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#️-installation--setup)

---

## 📌 Overview

The Task Manager Web Application allows users to:

- Create and manage tasks
- Assign tasks to other users
- Receive real-time updates and notifications

The application follows a **full-stack TypeScript architecture** with shared validation using **Zod** on both frontend and backend.

---

## 🚀 Tech Stack

### Frontend

- **Vite + React + TypeScript**
- **React Hook Form** – Form handling
- **Zod** – Schema-based validation
- **Tailwind CSS + DaisyUI** – UI styling
- **React Router DOM** – Routing
- **Axios** – API communication
- **Socket.IO Client** – Real-time updates
- **React Hot Toast** – Notifications

### Backend

- **Node.js + Express (TypeScript)**
- **MongoDB + Mongoose**
- **Socket.IO** – Real-time communication
- **Zod** – Request validation
- **JWT (JSON Web Token)** – Authentication
- **bcrypt** – Password hashing
- **dotenv** – Environment variables
- **CORS**

---

## ✨ Features

- JWT-based user authentication
- Create, edit, and delete tasks
- Assign tasks to users
- Overdue task detection
- Real-time task updates using Socket.IO
- Instant notifications for assigned users
- Frontend and backend validation using Zod
- Responsive and clean UI

---

## 📁 Project Structure

```bash
task-manager/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
```

## 🔐 Environment Variables
### Backend (.env)

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```bash
VITE_BASE_URL=http://localhost:5000
```

## ⚙️ Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git

cd task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

- Run backend in development mode:
```bash
 npm run dev
```

- The backend runs using nodemon with tsx.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

- Run frontend:
```bash
npm run dev
```

