import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookSecret } from "./controllers/clerkWebHooks.js";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  // "https://hotel-booking-backend-seven-ruddy.vercel.app/",
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
app.use(express.json());
app.use(clerkMiddleware());
// Define the webhook route
app.post("/api/clerk", clerkWebhookSecret);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Booking API after Connecting to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
