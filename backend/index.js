import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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

app.use("/students", studentRouter);


// Start the server
app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});