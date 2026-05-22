import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import admitCardRoutes from "./routes/admitCardRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(
      "Mongo Error:",
      err
    );
  });

// Routes
app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/admit-cards",
  admitCardRoutes
);
app.use(
  "/api/results",
  resultRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Server
const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);