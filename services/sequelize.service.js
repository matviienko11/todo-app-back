import {Sequelize} from "sequelize";

class SequelizeService {
    connectToDatabase() {
        const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');
        sequelize
            .authenticate()
            .then(function(err) {
                // User.init({  }, {sequelize});
                console.log('Connection has been established successfully.');
            })
            .catch(function (err) {
                console.log('Unable to connect to the database:', err);
            });
    }
}

export const sequelizeService  = new SequelizeService();
