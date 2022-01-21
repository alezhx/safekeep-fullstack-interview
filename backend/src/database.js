import Sequelize from 'sequelize'
import dotenv from "dotenv";

dotenv.config({path: '../database.env'})

const sequelizeInstance = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
)

console.log("TEST", process.env.POSTGRES_DB)

export default sequelizeInstance