import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

import dotenv from "dotenv";
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/users", userRouter);

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

app.use((req,res,next)=>
{
    let token = req.headers["authorization"];
    
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>
    {
        if(err || !decoded)
        {
            return res.status(401).json({ message: "Invalid Token Please Login Again" });
        }

        req.user = decoded;
        next();
    });
});

// Import the Routers
app.use("/students", studentRouter);
app.use("/products", productRouter);

// Start the server
app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});