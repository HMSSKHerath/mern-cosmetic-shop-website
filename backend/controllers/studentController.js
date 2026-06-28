import Student from "../models/studentModel.js";

function getStudent(req , res)
{
    Student.find()
    .then((students) =>
    {
        res.status(200).json(students);
    })
    .catch((err) =>
    {
        res.status(500).json({ message: "Error fetching students" });
    });
    console.log("Get request received");
}

function createStudent(req , res)
{
    if(!req.user)
    {
        return res.status(401).json({ message: "Invalid Token Please Login Again" });
    }

    if(req.user.role !== "admin")
    {
        return res.status(403).json({ message: "You are not admin to perform this action" });
    }
    
    const newStudent = new Student(
    {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    });
    
    newStudent.save()
    .then(() =>
    {
        res.status(201).json({ message: "Student saved successfully" });
    })
    .catch(() =>
    {
        res.status(500).json({ message: "Error saving student"});
    });
    console.log("Post request received");
}

export { getStudent , createStudent };