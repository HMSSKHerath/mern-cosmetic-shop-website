import express from "express";

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string (replace <db_password> with your actual password)
const connectionString = "mongodb+srv://admin:<db_password>@cluster0.ctlhqsc.mongodb.net/?appName=Cluster0";

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

