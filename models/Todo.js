import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import {User} from "./User";

const hooks = {
    async beforeCreate(todo) {
        todo.id = uuidv4();
    }
}

class Todo extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                required: true
            },
            isCompleted: {
                type: DataTypes.BOOLEAN
            },
            isInProgress: {
                type: DataTypes.BOOLEAN
            },
            description: {
                type: DataTypes.STRING,
                required: true
            },
            userId: {
                type: DataTypes.UUID
            }
        }, {
            sequelize,
            hooks,
            modelName: 'todos',
        })
    }
}

Todo.associate = (models) => {
    Todo.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'users'
    })

    return Todo;
}

export default Todo;
