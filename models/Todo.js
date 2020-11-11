import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./User";

const hooks = {
    async beforeCreate(todo) {
        todo.id = uuidv4();
    }
}

export class Todo extends Model {
    static id = {
        type: DataTypes.UUID,
        primaryKey: true
    }
    static name = {
        type: DataTypes.STRING,
        required: true
    }
    static isCompleted = {
        type: DataTypes.BOOLEAN
    }
    static isInProgress = {
        type: DataTypes.BOOLEAN
    }
    static description = {
        type: DataTypes.STRING,
        required: true
    }
    static userId = {
        type: DataTypes.UUID
    }

    static init(sequelize) {
        super.init({
            id: this.id,
            name: this.name,
            isCompleted: this.isCompleted,
            isInProgress: this.isInProgress,
            description: this.description,
            userId: this.userId
        }, {
            sequelize,
            hooks,
            modelName: 'todos'
        })
    }
}

Todo.associate = function () {
    Todo.belongsTo(User, {
        foreignKey: 'userId',
        as: 'users'
    })
}
