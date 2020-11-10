import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const hooks = {
    async beforeCreate(user) {
        user.id = uuidv4()
        user.password = await bcrypt.hash(user.password, 10);
    }
}

export  class User extends Model {
    static id = {
        type: DataTypes.UUIDV4,
        primaryKey: true
    };
    static name = {
        type: DataTypes.STRING,
        required: true
    };
    static email = {
        type: DataTypes.STRING,
        required: true
    };
    static password = {
        type: DataTypes.STRING,
        required: true,
    };

    static init(sequelize) {
        super.init({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }, {
            sequelize,
            hooks,
            modelName: 'user'
        })
    }
}
