import {Sequelize} from "sequelize";
import {User} from "../models/User";
import {Todo} from "../models/Todo";

class SequelizeService {
    initModels() {
        User.init(this.sequelize);
        Todo.init(this.sequelize);
    }

    async connectToDatabase() {
        try {
            this.sequelize = new Sequelize({
                dialect:  'postgres',
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: process.env.DB_PORT,
                host: process.env.DB_HOST
            });
            await this.sequelize.authenticate()
            console.log('Connection has been established successfully.');
            this.initModels()
        }  catch (error) {
            console.log('Unable to connect to the database:', error);
        }
    }
}

export const sequelizeService  = new SequelizeService();
