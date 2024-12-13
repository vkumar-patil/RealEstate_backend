const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `JWT_SECRET` with your actual secret
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware/route
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token expired:", error.expiredAt);
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
