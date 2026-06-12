import express from "express";
import Student from "../models/studentModel.js";

const studentRouter = express.Router();

studentRouter.get("/" , (req , res) =>
{
    Student.find()
    .then((students) =>
    {
        res.json(students);
    })
    .catch((err) =>
    {
        res.json({ message: "Error fetching students" });
    });
    console.log("Get request received");
});

studentRouter.post("/" , (req , res) =>
{
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
    .catch(() =>
    {
        res.json({ message: "Error saving student"});
    });
    console.log("Post request received");
});

studentRouter.put("/" , (req , res) =>
{
    res.json({ message: "Put request received" });
    console.log("Put request received");
});

studentRouter.delete("/" , (req , res) =>
{
    res.json({ message: "Delete request received" });
    console.log("Delete request received");
});

export default studentRouter;