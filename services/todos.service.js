import { privateKey } from "../middleware/auth";
import jwt from "jsonwebtoken";
import {sequelizeService} from "../models";

class TodosService {

    async getAllTodos() {
        return await sequelizeService.db.todos.findAll({
             include: [{model: sequelizeService.db.users, as: 'users'}]
        });
    }
    // async getAllTodos() {
    //     return await Todo.findAll();
    // }

    async getOneTodo(req) {
        return await sequelizeService.db.todos.findOne({
            where: {
                id: req.params.id
            }
        })
    }

    async getCertainTodos(req) {
        return await sequelizeService.db.todos.findAll({
            where: {
                userId: req.user.id
            }
        })
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
        return await sequelizeService.db.todos.destroy({
            where: {
                id: req.params.id
            }
        })
    }

    async editTodo(req) {
        return (await sequelizeService.db.todos.findOne({
            where: {
                id: req.params.id
            }
        })).update({
            ...req.body
        })
    }
}
export const todosService  = new TodosService();
