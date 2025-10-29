// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRouter from "./routes/userRoute.js"
// import 'dotenv/config'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"


// const app = express()
// const port = process.env.PORT || 4000;

// app.use(express.json())
// app.use(cors())
// app.use("/api/user", userRouter)
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

// //db connection
// connectDB();

// //api endpoints
// app.use("/api/food", foodRouter)
// app.use("/images", express.static('uploads'))

// app.get('/', (req, res) => {
//   res.send("API Working")
// })

// app.listen(port, () => {
//   console.log(`Server Started on http://localhost:${port}`)
// })


// //mongodb+srv://sainidevx:5642@cluster0.bay5ehc.mongodb.net/?












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

// ✅ Allow only your frontend and localhost (for testing)
const allowedOrigins = [
  "https://foodiq.vercel.app", // production frontend
  "http://localhost:3000",     // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// DB connection
connectDB();

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
