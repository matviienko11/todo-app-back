import { Router } from "express";
import { todosService } from "../services/todos.service";
import { isAuthorized } from "../middleware/auth";

const router = new Router;

router.get("/todos", isAuthorized, async (req, res) => {
    if (req.user.role === "Admin") {
        const todos = await todosService.getAllTodos(req, res);
        res.json({
            data: todos,
            authUserInfo: req.user
        })
    } else {
        const todos = await todosService.getCertainTodos(req, res);
        res.json({
            data: todos,
            authUserInfo: req.user
        })
    }
});

router.get("/todos/:id", async (req, res) => {
    const oneTodo = await todosService.getOneTodo(req);
    res.json({
        status: "You todo has been found",
        data: oneTodo
    })
})

router.post("/todos",async (req, res) => {
    const postTodo = await todosService.createTodo(req);
    res.json({
        status: "Todo has been created",
        data: postTodo
    })
})

router.delete("/todos/:id", async (req, res) => {
    const deletedTodo = await todosService.deletedTodo(req);
    res.json({
        status: "Todo has been deleted",
        data: deletedTodo
    })
});

router.patch("/todos/:id", isAuthorized, async (req, res) => {
    const editedTodo = await todosService.editTodo(req);
    res.json({
        status: "Todo has been changed",
        data: editedTodo
    })
})

export default router;
