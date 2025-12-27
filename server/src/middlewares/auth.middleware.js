import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.header("Authorization");

  // 1. Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // 2. Verify token
    // The frontend sends "Bearer <token>", so we split to get the actual token part
    const tokenPart = token.split(" ")[1] || token; 
    
    const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to the request
    next(); // Allow access to the route
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default protect;