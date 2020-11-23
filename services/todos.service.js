import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import { sequelizeService } from "../models";
import {Op} from "sequelize";

class TodosService {

    async getOneTodo(req) {
        try {
            return await sequelizeService.db.todos.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async getAllTodos(req, res) {
        try {
            const getPagination = (page, size) => {
                const limit = size ? +size: 3;
                const offset = page? page * limit: 0;
                return {limit, offset};
            };

            const getPagingData = (data, page, limit) => {
                const { count: totalItems, rows: todos } = data;
                const currentPage = page ? +page : 0;
                const totalPages = Math.ceil(totalItems / limit);

                return { totalItems, todos, totalPages, currentPage };
            };
            const {page, size, name} = req.query;
            let nameQuery = name ? {name: {[Op.like]: `%${name}%`}} : null;
            const {limit, offset} = getPagination(page, size);


            const response = await sequelizeService.db.todos.findAndCountAll({
                limit,
                offset,
                where: nameQuery
                // include: [{model: sequelizeService.db.users, as: 'users'}]
            })
            return getPagingData(response, page, limit);
        } catch (e) {
            console.log(e);
        }
    }

    async getCertainTodos(req, res) {
        try {
            const getPagination = (page, size) => {
                const limit = size ? +size: 3;
                const offset = page? page * limit: 0;
                return {limit, offset};
            };

            const getPagingData = (data, page, limit) => {
                const { count: totalItems, rows: todos } = data;
                const currentPage = page ? +page : 0;
                const totalPages = Math.ceil(totalItems / limit);

                return { totalItems, todos, totalPages, currentPage };
            };
            const {page, size} = req.query;
            const {limit, offset} = getPagination(page, size);

            const response = await sequelizeService.db.todos.findAndCountAll({
                where: {
                    userId: req.user.id
                },
                limit,
                offset
            })
            return getPagingData(response, page, limit);
        } catch (e) {
            console.log(e)
        }
    }

    async getCompletedTodos() {
        try {
            return await sequelizeService.db.todos.findAll({
                where: {
                    isCompleted: true
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async createTodo (req) {
        try {
            const token = req.headers['authorization'];
            const parsedToken = jwt.verify(token, privateKey);
            const user = await sequelizeService.db.users.findOne({
                where: {
                    id: parsedToken.id
                }
            })
            return await sequelizeService.db.todos.create({
                name: req.body.name,
                description: req.body.description,
                userId: user.id
            })
        } catch (e) {
            console.log(e)
        }
    }

    async deleteTodo(req) {
        try {
            return await sequelizeService.db.todos.destroy({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async editTodo(req) {
        try {
            return (await sequelizeService.db.todos.findOne({
                where: {
                    id: req.params.id
                }
            })).update({
                ...req.body
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export const todosService  = new TodosService();
