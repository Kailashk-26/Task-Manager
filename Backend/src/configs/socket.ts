import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";

let io: Server;
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins, 
      methods: ["GET", "POST"],
      credentials:true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as { userId: string };

      socket.data.userId = decoded.userId;

      socket.join(decoded.userId);

      console.log("Socket authenticated:", decoded.userId);
      next();
    } catch (err) {
      console.error("Socket auth failed");
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.data.userId);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.data.userId);
    });
  });
};



export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
