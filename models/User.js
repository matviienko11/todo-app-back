import { Sequelize } from "sequelize";
const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    }
});
