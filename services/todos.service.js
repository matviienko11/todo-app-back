import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from 'uuid';


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

    async createTodo(req) {
        return await Todo.create({
            id: uuidv4(),
            name: req.body.name,
            description: req.body.description
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
