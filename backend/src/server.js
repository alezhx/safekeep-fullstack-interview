import express from "express";
import bodyParser from "body-parser";
import { getAll, createUser, deleteUser } from './userController.js';
import sequelizeInstance from './database.js';
import User from './models/users.js'; 

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next();
});

const PORT = 8081

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/users', getAll);
app.post('/users', createUser);
app.delete('/users/:id', deleteUser);

const start = async () => {
  try {
    await sequelizeInstance.sync(
      { force: false }
    );

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error);
  }
};

start();