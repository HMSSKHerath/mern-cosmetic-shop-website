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
        res.json({ message: "User created successfully" });
    })
    .catch(()=>
    {
        res.json({ message: "Error creating user" });
    });
}

function loginUser(req, res)
{
    User.findOne({email: req.body.email})
    .then((foundUser)=>
    {
        if(!foundUser)
        {
            return res.json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isPasswordValid)
        {
            return res.json({ message: "Invalid password" });
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
            "secret_key"
        )

        res.json({ message: "User logged in successfully", token: token });
    })
    .catch(()=>
    {
        res.json({ message: "Error logging in user" });
    });
}

export { createUser , loginUser };