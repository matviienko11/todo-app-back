import { Router } from "express";
import { todosService } from "../services/todos.service";

const router = new Router;

router.get("/todos", async (req, res) => {
    try {
        const todos =  await todosService.getAllTodos();
        res.json({
            status: "The list of all todos",
            data: todos
        })
    } catch (error) {
        // const errorData = errorService.notFondError(error)

        res.json({
            status: "Some error happened",
            data: error
        })
    }
})

router.get("/todos/:id", async (req, res) => {
    try {
        const oneTodo = await todosService.getOneTodo(req);
        res.json({
            status: "You todo has been found",
            data: oneTodo
        })
    } catch (error) {
        res.json({
            status: "Couldn't find requested todo",
            data: error
        })
    }
})

router.post("/todos", async (req, res) => {
    try {
        const postTodo = await todosService.createTodo(req);
        res.json({
            status: "Todo has been created",
            data: postTodo
        })
    } catch (error) {
        res.json({
            status: "Todo hasn't been created",
            data: error
        })
    }
})

router.delete("/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await todosService.deleteTodo(req);
        res.json({
            status: "Todo has been deleted",
            data: deletedTodo
        })
    } catch (error) {
        res.json({
            status: "Todo hasn't been deleted",
            data: error
        })
    }
});

router.patch("/todos/:id", async (req, res) => {
    try {
        const editedTodo = await todosService.editTodo(req);
        res.json({
            status: "Todo has been changed",
            data: editedTodo
        })
    } catch (error) {
        res.json({
            status: "No changes happened",
            data: error
        })
    }
})

export default router;
