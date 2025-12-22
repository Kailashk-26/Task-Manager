// src/socket.ts
import { Server } from "socket.io";
import http from "http";

let io: Server;

/**
 * Initialize socket.io with http server
 */
export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // later restrict to frontend URL
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(userId); // room = userId
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

/**
 * Get socket instance anywhere (controllers)
 */
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
