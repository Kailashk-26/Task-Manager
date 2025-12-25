import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";

import connectDB from "./configs/db.ts";
import userRoute from "./routes/userRoute.ts";
import taskRoute from "./routes/taskRoute.ts";
import { initSocket } from "./configs/socket.ts";

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

// DB
await connectDB();

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

// routes
app.get("/", (req, res) => {
  res.send("server is live");
});

app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
