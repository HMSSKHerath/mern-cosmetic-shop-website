import express from "express";
import mongoose from "mongoose";

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

const studentSchema = new mongoose.Schema(
{
    name: String,
    age: Number,
    city: String
});

const Student = mongoose.model("Student", studentSchema);

// Define routes
app.get("/",(req, res) =>
{
    console.log(req.body);
    console.log("Get request received");
    res.json({message: "Get request received"});
});

app.post("/",(req, res) =>
{
    console.log(req.body);
    console.log("Post request received");

    const newStudent = new Student(
    {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    });
    newStudent.save()
    .then(() =>
    {
        res.json({ message: "Student saved successfully" });
    })
    .catch((err)=>
    {
        res.json({ message: "Error saving student" });
    })
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

