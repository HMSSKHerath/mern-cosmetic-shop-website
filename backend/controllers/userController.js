import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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

export { createUser };