import { Todo } from "../models/Todo";
import {isAuthorized, privateKey} from "../middleware/auth";
import {users} from "../routes";
import jwt from "jsonwebtoken";
import {User} from "../models/User";



class TodosService {

    async getAllTodos() {
        return await Todo.findAll()
    }

    async getOneTodo(req) {
        return await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
    }

    async getCertainTodos(req) {
        const token = req.headers['authorization'];
        const parsedToken = jwt.verify(token, privateKey);
        const user = await User.findOne({
            where: {
                id: parsedToken.id
            }
        })
        return await Todo.findAll({
            where: {
                userId: user.id
            }
        })
    }

    async createTodo (req) {
        const token = req.headers['authorization'];
        const parsedToken = jwt.verify(token, privateKey);
        const user = await User.findOne({
            where: {
                id: parsedToken.id
            }
        })
        return await Todo.create({
            name: req.body.name,
            description: req.body.description,
            userId: user.id
        })
    }

    async deleteTodo(req) {
        return await Todo.destroy({
            where: {
                id: req.params.id
            }
        })
    }

    async editTodo(req) {
        return (await Todo.findOne({
            where: {
                id: req.params.id
            }
        })).update({
            ...req.body
        })
    }
}
export const todosService  = new TodosService();
