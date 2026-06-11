import express from "express";

const app = express();

app.get("/",() =>
{
    console.log("Get request received");
});

app.post("/",() =>
{
    console.log("Post request received");
});

app.delete("/", () =>
{
    console.log("Delete request received");
});

app.put("/", () =>
{
    console.log("Put request received");
});

app.listen(5000, () =>
{
    console.log("Server is running on port 5000...");
});

