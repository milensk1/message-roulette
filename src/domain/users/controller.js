import { handleRegister, handleLogin } from "./service.js";

export const register = async (req, res) => {
  try {
    await handleRegister(req);
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
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
    res.status(404).json({ msg: error });
  }
};
