const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        status: "failure",
        message: "No token provided. Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;
