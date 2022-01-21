import sequelizeInstance from './database.js'
import User from './models/users.js'

export async function createUser(req, res) {
  console.log('createUser: [POST] /users/')
  try {
    const USER_MODEL = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hours: req.body.hours,
    }

    try {
      const user = await User.create(USER_MODEL)
      console.log('OK createUser USER: ', user)
      return res.status(201).json(user)
    } catch (error) {
      console.log('ERROR in createUser ' + 'USER:', error)
      return res.status(500).json(error)
    }
  } catch (error) {
    return res.status(400).json('Bad Request')
  }
}


export async function getAll(req, res) {
  console.log('getAll: [GET] /users/')
  try {
    const allUsers = await User.findAll()
    console.log(
      'OK getAll USER: ',
      allUsers.map((user) => user.dataValues),
    )
    return res.status(200).json(allUsers)
  } catch (error) {
    console.log('ERROR in getAll ' + 'USER:', error)
    return res.status(500).json(error)
  }
}

export async function deleteUser (req, res) {
  console.log('[DELETE] /users/:id')
  try {
    const deleteUser = await User.destroy({ where: { id: req.body.id } })
    console.log('OK deleteUser USER: ')
    return res.status(200).json(deleteUser)
  } catch (error) {
    console.log('ERROR in deleteUser ' + 'USER:', error)
    return res.status(500).json(error)
  }
}