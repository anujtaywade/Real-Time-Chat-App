const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    const token = req.cookies.token;   // ✅ ONLY cookies (no headers)

    if (!token) {
      return res.status(401).json({ message: "No token found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;   // ✅ attach user id
    next();

  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
