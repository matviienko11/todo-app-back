import { Sequelize } from "sequelize";
const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');

export const Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    isCompleted: {
        type: Sequelize.BOOLEAN
    },
    isInProgress: {
        type: Sequelize.BOOLEAN
    },
    description: {
        type: Sequelize.STRING,
        required: true
    }
});
