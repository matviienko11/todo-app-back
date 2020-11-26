import bcrypt from "bcrypt";
import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import { sequelizeService } from "../models";

const getPagination = (page, size) => {
    const limit = size ? +size: 3;
    const offset = page? page * limit: 0;
    return {limit, offset};
};
const getPagingData = (data, page, limit) => {
    const { count: count, rows: result } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    return { count, result, totalPages, currentPage };
};

export class UsersService {

    async getOneUser(req) {
        try {
            return await sequelizeService.db.users.findOne({
                where: {
                    id: req.params.id
                },
                include: [{model: sequelizeService.db.todos, as: 'todos'}]
            })
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUsers(req, res) {
         try {
             const {page, size} = req.query;
             const {limit, offset} = getPagination(page, size);

             const result = await sequelizeService.db.users.findAndCountAll({
                limit,
                offset,
                // include: [{model: sequelizeService.db.todos, as: 'todos'}]
            });
             return getPagingData(result, page, limit)
        } catch (e) {
            console.log(e)
        }
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

    async deletedUser(req) {
        try {
            await sequelizeService.db.users.destroy({
                where: {
                    id: req.params.id
                }
            })
            return await sequelizeService.db.users.findAll()
        } catch (e) {
            console.log(e)
        }
    }
}

export const usersService  = new UsersService();
