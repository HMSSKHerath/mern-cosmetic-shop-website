import express from "express";

// Create an instance of the Express application
const app = express();

// Define routes
app.get("/",(req, res) =>
{
    console.log(req);
    console.log("Get request received");
});

app.post("/",(req, res) =>
{
    console.log("Post request received");
});

app.delete("/", (req, res) =>
{
    console.log("Delete request received");
});

app.put("/", (req, res) =>
{
    console.log("Put request received");
});

// Start the server
app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});

