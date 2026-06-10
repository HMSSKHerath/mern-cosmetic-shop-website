import express from "express";

const app = express();

function serverStart()
{
    console.log("Server is starting...");
}
app.listen(3000, serverStart);

