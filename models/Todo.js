import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

const hooks = {
    async beforeCreate(todo) {
        todo.id = uuidv4();
    }
}

export class Todo extends Model {
    static id = {
        type: DataTypes.UUIDV4,
        primaryKey: true
    }
    static name = {
        type: DataTypes.STRING,
        required: true
    }
    static isCompleted = {
        type: DataTypes.STRING
    }
    static isInProgress = {
        type: DataTypes.STRING
    }
    static description = {
        type: DataTypes.STRING,
        required: true
    }

    static init(sequelize) {
        super.init({
            id: this.id,
            name: this.name,
            isCompleted: this.isCompleted,
            isInProgress: this.isInProgress,
            description: this.description
        }, {
            sequelize,
            hooks,
            modelName: 'todo'
        })
    }
}
