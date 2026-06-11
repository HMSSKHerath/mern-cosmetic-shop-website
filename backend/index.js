import express from "express";
import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string (replace <db_password> with your actual password)
const connectionString = "";

mongoose.connect(connectionString)
.then(()=>
{
    console.log("Connected to MongoDB");
})
.catch((err) =>
{
    console.error("Error connecting to MongoDB:", err);
});

// Define routes
app.get("/",(req, res) =>
{
    console.log(req.body);
    console.log("Get request received");

    let title = "Mr. ";

    if(req.body.Gender === "Female")
    {
        title = "Ms. ";
    }

    res.json({ message: `Hello ${title} ${req.body.Name}` });
});

app.post("/",(req, res) =>
{
    console.log("Post request received");
    res.json({ message: "Post request received" });
});

app.delete("/", (req, res) =>
{
    console.log("Delete request received");
    res.json({ message: "Delete request received" });
});

app.put("/", (req, res) =>
{
    console.log("Put request received");
    res.json({ message: "Put request received" });
});

// Start the server
app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});

