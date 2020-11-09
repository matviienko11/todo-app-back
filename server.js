import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { users, auth, todos } from "./routes";
import { sequelizeService } from "./services/sequelize.service";
// import("dotenv").then(() => {
//     config({
//         url: process.env.DEV_DATABASE_URL,
//         dialect: 'postgres',
//     })
// })



const app = express();
const PORT = 3000;

sequelizeService.connectToDatabase();

app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(auth);
app.use(users);
app.use(todos);

app.get("*", (req, res) => {
    res.send("Hello World!")
})

app.listen (PORT, () => {
    console.log("Server started on port: ", PORT)
})
