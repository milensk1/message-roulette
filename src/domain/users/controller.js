import { handleRegister, handleLogin } from "./service.js";

export const register = async (req, res) => {
  try {
    await handleRegister(req);
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { refreshToken, accessToken } = await handleLogin(req);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
