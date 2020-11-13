import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const hooks = {
    async beforeCreate(user) {
        user.id = uuidv4()
        user.password = await bcrypt.hash(user.password, 10);
    }
}

class User extends Model {
    static async init(sequelize) {
        await super.init({
            id: {
                type: DataTypes.UUID,
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
                required: true,
            },
            role: {
                type: DataTypes.ENUM('Admin', 'Manager', 'User'),
                defaultValue: 'User',
            }
        }, {
            sequelize,
            hooks,
            modelName: 'users',
        })
    }
}

User.associate = (models) => {
    User.hasMany(models.todos)
    return User;
}

export default User;
