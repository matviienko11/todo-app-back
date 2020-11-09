import {Model, Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');


class User extends Model { }
User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
}, {sequelize, modelName: 'user'})


export {User};
