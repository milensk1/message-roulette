import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const chat = async (req, res) => {
  res.sendFile(__dirname + "/index.html");
  setTimeout(() => {
    req.app.io.emit("chat message", "HELLO");
  }, 5000);
};
