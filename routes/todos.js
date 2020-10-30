import {Router} from "express";
import {Todo} from "../models/Todo";
import {isAuthorized} from "../services/auth";

const router = new Router;
const todoList = [];

router.get("/todos", isAuthorized, async (req, res) => {
    await Todo.findAll().then((todos) => {
        res.json(todos);
    })
})

router.post("/todos", async (req, res) => {
    const newTodo = await Todo.sync().then(() => {
        return Todo.create({
            id: req.body.id,
            name: req.body.name
        })
    })
    todoList.push(newTodo);
    console.log(newTodo);
    res.json({
        status: "created",
        // data: todoList
    })
})

router.delete("/todos/:id", async (req, res) => {
    const findTodo = await Todo.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log("FINDTODO", findTodo);
    await findTodo.destroy();
    res.json({
        status: "deleted"
    })
});




export default router;
