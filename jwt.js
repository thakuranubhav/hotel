const jwt= require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {
    // Check authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    // Extract the JWT token
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user info to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid Token' });
    }
}
//Generate Token
const generateToken= (userData)=>{
    //Generate a new JWT Token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000})
}
module.exports={jwtAuthMiddleware,generateToken}