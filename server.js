import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import { users, auth, listUsers } from "./routes"

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(auth);
app.use(users);

app.get("*", (req, res) => {
    res.send("Hello World!")
})



app.listen (PORT, () => {
    console.log("Server started on port: ", PORT)
})
