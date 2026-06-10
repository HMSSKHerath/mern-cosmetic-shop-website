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

app.listen(3000, () =>
{
    console.log("Server is running on port 3000...");
});

