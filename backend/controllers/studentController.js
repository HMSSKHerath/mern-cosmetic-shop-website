import Student from "../models/studentModel.js";

async function getStudent(req , res)
{
    try
    {
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({message:"Error fetching students"});
    }
}

async function createStudent(req , res)
{
    try 
    {
        const { name, age, city } = req.body;
        const newStudent = new Student({name, age, city});

        await newStudent.save();
        res.status(201).json({ message: "Student saved successfully" });
    }   
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Error saving student" });
    } 
}

export { getStudent , createStudent };