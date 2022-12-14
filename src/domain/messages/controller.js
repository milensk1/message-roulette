import { handleSpin, handleWild, handleBlast } from "./service.js";

export const spin = async (req, res) => {
  try {
    await handleSpin(req.app.io);
    res.send("OK");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const wild = async (req, res) => {
  try {
    const { count } = req.query;
    await handleWild(req.app.io, count);
    res.send("OK");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const blast = (req, res) => {
  try {
    handleBlast(req.app.io);
    res.send("OK");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
