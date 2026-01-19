import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

// health check (for cron)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// root
app.get("/", (req, res) => {
  res.send("API Working");
});

// db connection
connectDB();

// start server
app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});



