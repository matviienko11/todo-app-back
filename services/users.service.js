import { User } from "../models/User";
import bcrypt from "bcrypt";
import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";


export class UsersService {

    async getAllUsers() {
        return await User.findAll()
    }

    async getUserByEmail(req) {
        return await User.findOne({
            where: {
                email: req.body.email
            }
        })
    }

    async authUser(req) {
        const user = await User.findOne({
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
        return await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
    }
}

export const usersService  = new UsersService();
