const jwt =require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) => {


 const authMiddleware = req.header("Authorization");
 const token = authHeader.split(" ")[1];

if(!token){
    return res.status(401).json ({ error: "Token Not Provided"})
}

try {

    const decoded =jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

} catch (error) {
    console.error('Authentication Error :', error);
    return res.status(401).json({ error: "Invalide Token"});
    
}

}

module.exports = authMiddleware