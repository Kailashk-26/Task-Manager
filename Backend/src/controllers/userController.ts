import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import { AuthRequest } from "../middleware/authMiddleware.ts";

const generateToken = (userId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }

    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// api/users/reg
export const regUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id.toString());

        const user = await User.findById(newUser._id).select("-password");

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user,
        });

    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// api/users/login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id.toString());

        const showUser = await User.findById(user._id).select("-password");
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: showUser,
        });

    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// api/users/check
export const checkAuth = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};


// api/users/logout
export const logoutUser = async (_req: Request, res: Response) => {
    return res.status(200).json({ message: "Logged out successfully" });
};

// api/users/update
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, jobPosition } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, jobPosition},
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(updateUser)
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });


  } catch (err) {
    return res.status(500).json({
      message: err instanceof Error ? err.message : "Server error",
    });
  }
};

// api/users/del
export const deleteAcc = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId; // from auth middleware

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: "Account deleted successfully" });

    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// api/users/getAll
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json(users);

    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
