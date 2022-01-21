import * as Sequelize from 'sequelize'
import db from '../database.js'

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hours: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

export default User