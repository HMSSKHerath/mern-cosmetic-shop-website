import Student from "../models/studentModel.js";

function getStudent(req , res)
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
}

function createStudent(req , res)
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
}

export { getStudent , createStudent };