import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const userRouter = express.Router();

// Middleware to check if the user is authenticated
userRouter.get("/", authMiddle, userController);

export default userRouter;
