import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = async (req) => {
  try {
    const user = await userModel.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      throw new Error("Wrong credentials");
    }

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1w",
      }
    );
    await userModel.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Wrong credentials");
  }
};
