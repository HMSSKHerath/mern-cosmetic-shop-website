import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req,res,next)=>
{
    let token = req.headers.authorization;
    
    if(!token)
    {
        return res.json({ message: "Unauthorized Access" });
    }

    token = token.replace("Bearer ", "");
    console.log(token);
    jwt.verify(token, "secret_key", (err, decoded)=>
    {
        if(!decoded)
        {
            return res.json({ message: "Invalid Token Please Login Again" });
        }

        req.user = decoded;
    });
    next();
});

// MongoDB connection string (replace <db_password> with your actual password)
const connectionString = "mongodb+srv://admin:@cluster0.ctlhqsc.mongodb.net/?appName=Cluster0";

mongoose.connect(connectionString)
.then(()=>
{
    console.log("Connected to MongoDB");
})
.catch((err) =>
{
    console.error("Error connecting to MongoDB:", err);
});

// Import the Routers
app.use("/students", studentRouter);
app.use("/users", userRouter);


// Start the server
app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});