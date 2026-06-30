import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function createUser(req, res)
{
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User(
    {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role
    });
    
    newUser.save()
    .then(()=>
    {
        res.status(201).json({ message: "User created successfully" });
    })
    .catch(()=>
    {
        res.status(500).json({ message: "Error creating user" });
    });
}

function loginUser(req, res)
{
    User.findOne({email: req.body.email})
    .then((foundUser)=>
    {
        if(!foundUser)
        {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isPasswordValid)
        {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                role: foundUser.role,
                isblocked: foundUser.isblocked,
                isEmailVerified: foundUser.isEmailVerified
            },
            "secret_key", { expiresIn: "1h" }
        )

        res.status(200).json({ message: "User logged in successfully", token: token });
    })
    .catch(()=>
    {
        res.status(500).json({ message: "Error logging in user" });
    });
}

function isAdmin(req)
{
    if(!req.user) return false;
    if(req.user.role !== "admin") return false;

    return true;
}

export { createUser , loginUser , isAdmin };