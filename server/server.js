const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { clerkMiddleware } = require("@clerk/express");
const clerkWebhookSecret = require("./controllers/clerkWebHooks");

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
// Define the webhook route
app.use("/webhooks/clerk", clerkWebhookSecret);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Booking API after Connecting to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
