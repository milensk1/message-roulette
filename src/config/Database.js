import { Sequelize } from "sequelize";

const db = new Sequelize("message_roulette", "root", "qwerty!", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
