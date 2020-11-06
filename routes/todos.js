import { Router } from "express";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from 'uuid';

const router = new Router;
const todoList = [];

router.get("/todos", async (req, res) => {
    await Todo.findAll().then((todos) => {
        res.json(todos);
    })
})

router.get("/todos/:id", async (req, res) => {
    const foundTodo = await Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    console.log("FOUNDTODO", foundTodo)
    res.json({
        status: "the todo has been found",
        data: foundTodo
    })
})

router.post("/todos", async (req, res) => {
    const newTodo = await Todo.sync().then(() => {
        return Todo.create({
            id: uuidv4(),
            name: req.body.name,
            description: req.body.description
        })
    })
    todoList.push(newTodo);
    console.log(newTodo);
    res.json({
        status: "created",
        data: newTodo
    })
})

router.delete("/todos/:id", async (req, res) => {
    const findTodo = await Todo.findOne({
        where: {
            id: req.params.id
        }
    });
    // console.log("FINDTODO", findTodo);
    await findTodo.destroy();
    res.json({
        status: "deleted"
    })
});

router.patch("/todos/:id", async (req, res) => {
    const findTodo = await Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    console.log("FINDTODO", findTodo);

    const updatedTodo = await findTodo.update({
        ...req.body
    })
    console.log('REQBODY', req.body)
    res.json({
        status: "changed",
        data: updatedTodo
    })
})

router.put("/todos/:id", async (req, res) => {
    const findTodo = await Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    const updatedTodo = await findTodo.update({
        ...req.body
    })
    console.log('REQBODY', req.body)
    res.json({
        status: "changed",
        data: updatedTodo
    })
})


export default router;
