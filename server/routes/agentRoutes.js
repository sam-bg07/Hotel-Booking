import { Router } from "express";
import Agent from "../controllers/agent.controller.js";
import { authMiddle } from "../middleware/authMiddleware.js";
import { getAuth } from "@clerk/express";
import User from "../models/User.js";

const agentRoutes = Router();

// Custom middleware for the agent that allows both authenticated and unauthenticated users
const optionalAuth = async (req, res, next) => {
  const { userId } = getAuth(req);
  if (userId) {
    req.user = await User.findById(userId);
  }
  next();
};

agentRoutes.post("/", optionalAuth, Agent);

export default agentRoutes;
