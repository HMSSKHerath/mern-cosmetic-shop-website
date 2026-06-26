import User from "../models/userModel.js";

function createUser(req, res)
{
    const newUser = new User(
    {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        role: req.body.role,
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