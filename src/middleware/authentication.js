import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const verifyEndpoint = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.email = decoded.email;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const verifySocket = (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, tokenSecret);
    socket.userId = payload.id;
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
};
