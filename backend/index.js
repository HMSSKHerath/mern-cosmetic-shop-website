import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/users", userRouter);

// MongoDB connection string (replace <db_password> with your actual password)
const connectionString = "mongodb+srv://admin:@cluster0.ctlhqsc.mongodb.net/?appName=Cluster0";

mongoose.connect(connectionString)
.then(()=>
{
    console.log("Connected to MongoDB");
})
.catch((err) =>
{
    console.log("Error connecting to MongoDB:", err);
});

// Middleware to verify JWT token
app.use((req,res,next)=>
{
    let token = req.headers["authorization"];
    
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    token = token.replace("Bearer ", "");
    jwt.verify(token, "jwt_key", (err, decoded)=>
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