import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
};
