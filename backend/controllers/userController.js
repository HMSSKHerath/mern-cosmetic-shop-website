import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

async function createUser(req, res)
{
    try
    {
        const { email, firstName, lastName, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User(
            {
                email, 
                firstName, 
                lastName, 
                password: hashedPassword, 
                role:'user'
            }
        );
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch(error)
    {
        if(error.code === 11000)
        {
            return res.status(409).json({ message: "User with this email already registered" });
        }

        console.error(error);
        res.status(500).json({ message: "Error saving user" });
    }
}

async function loginUser(req, res)
{
    try
    {
        const{ email, password } = req.body;
        const foundUser = await User.findOne({ email: email });

        if(!foundUser)
        {
            return res.status(404).json({ message: "User not found" });
        }

        if(foundUser.isBlocked)
        {
            return res.status(403).json({ message: "Your account has been blocked. Please contact support." });
        }

        const isPasswordValid = bcrypt.compareSync(password, foundUser.password);

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
                isBlocked: foundUser.isBlocked,
                isEmailVerified: foundUser.isEmailVerified
            },
            process.env.JWT_SECRET, { expiresIn: "1h" }
        )

        res.status(200).json({ message: "User logged in successfully", token: token });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Error logging in user" });
    }
}

export { createUser , loginUser };