import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { createExperienceBooking } from "../controllers/experienceController.js";

const experienceRouter = express.Router();

// Middleware to check if the user is authenticated
experienceRouter.post("/", authMiddle, createExperienceBooking);

export default experienceRouter;
