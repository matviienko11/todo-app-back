import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { users, auth, todos } from "./routes";
import { sequelizeService } from "./services/sequelize.service";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config()

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

sequelizeService.connectToDatabase();

app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(auth);
app.use(users);
app.use(todos);

app.get("*", (req, res) => {
    res.send("Hello World!")
})

app.listen (PORT, () => {
    console.log(`Server started on: ${HOST}://${PORT}`)
})
