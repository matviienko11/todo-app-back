import {Sequelize, Model, DataTypes} from "sequelize";
const sequelize = new Sequelize('postgres://cruzinshtern:user@127.0.0.1:5432/todosdb');

class Todo extends Model { }
Todo.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
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
    },
}, {sequelize, modelName: 'todo'})

export {Todo}
