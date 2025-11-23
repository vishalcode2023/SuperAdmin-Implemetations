const jwt = require("jsonwebtoken");

const verify = (...models) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;
      for (const Model of models) {
        user = await Model.findById(decoded.id);
        if (user) break;
      }

      if (!user) {
        return res
          .status(403)
          .json({ message: "Access denied: invalid token or user not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = verify; 
