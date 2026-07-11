const verifyAdminRole = (req,res,next) =>
{
    if(!req.user)
    {
        return res.status(401).json({ message: "User not found" });
    }

    if(req.user.role !== "admin") 
    {
        return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action" });
    }
    
    next();
}

export default verifyAdminRole;