import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import { sequelizeService } from "../models";

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

    async getAllTodos() {
        try {
            return await sequelizeService.db.todos.findAll({
                include: [{model: sequelizeService.db.users, as: 'users'}]
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getCertainTodos(req) {
        try {
            return await sequelizeService.db.todos.findAll({
                where: {
                    userId: req.user.id
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
