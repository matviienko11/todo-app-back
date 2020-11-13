import bcrypt from "bcrypt";
import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import {sequelizeService} from "../models";


export class UsersService {

    async getAllUsers() {
        return await sequelizeService.db.users.findAll({
              include: [{model: sequelizeService.db.todos, as: 'todos'}]
        }).toJSON();
    }

    async getUserByEmail(req) {
        try {
            return await sequelizeService.db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
        } catch (e) {
            console.log(e)
        }

    }

    async authUser(req) {
        const user = await sequelizeService.db.users.findOne({
            where: {
                name: req.body.name
            }
        })
        if(user) {
            const isPassValid = await bcrypt.compare(req.body.password, user.password);
            if(isPassValid) {
                return jwt.sign({
                    id: user.id
                   }, privateKey)
            }
        }
    }

    async createUser(req) {
        try {
            return await sequelizeService.db.users.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
        } catch (e) {
            console.log(e)
        }

    }
}

export const usersService  = new UsersService();
