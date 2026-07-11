import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

import dotenv from "dotenv";
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/users", userRouter);
app.use("/students", studentRouter);
app.use("/products", productRouter);

// Connect to MongoDB
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
.then(()=>
{
    console.log("Connected to MongoDB");
})
.catch((err) =>
{
    console.log("Error connecting to MongoDB:", err);
});

// Start the server
app.listen(process.env.PORT, () =>
{
    console.log(`Server is running on port ${process.env.PORT}...`);
});