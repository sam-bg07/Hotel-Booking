import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhookSecret from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import roomRouter from "./routes/roomRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import experienceRouter from "./routes/experienceRouter.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";
import couponRouter from "./routes/couponRouter.js";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

const allowedOrigins = [
  "http://localhost:5173",
  "https://staystack.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

//api to lisen stripe webhook

app.use(express.json());
app.use(clerkMiddleware());
// Define the webhook route
app.post("/api/clerk", clerkWebhookSecret);

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Booking API after Connecting to MongoDB!");
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/coupon", couponRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
