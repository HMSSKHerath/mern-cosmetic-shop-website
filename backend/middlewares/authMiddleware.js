import jwt from "jsonwebtoken";

const authMiddleware = ((req,res,next)=>
{
    let token = req.headers["authorization"];
    
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>
    {
        if(err || !decoded)
        {
            return res.status(401).json({ message: "Invalid Token Please Login Again" });
        }

        req.user = decoded;
        next();
    });
});

export default authMiddleware;