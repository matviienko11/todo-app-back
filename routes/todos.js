import { Router } from "express";
import { todosService } from "../services/todos.service";
import {usersService} from "../services/users.service";
import { isAuthorized } from "../middleware/auth";
import { generateDto } from "../utils/generate-dto";

const router = new Router;

router.get("/todos", isAuthorized, async (req, res) => {
    const allTodos = await todosService.getAllTodos();
    if(req.user.role !== "User") {
        res.json({
            data: allTodos,
            userInfo: req.user,
            userRole: req.user.role
        })
    } else {
        const certainTodos =  await todosService.getCertainTodos(req);
        res.json({
            data: certainTodos,
            userInfo: req.user,
            userRole: req.user.role
        })
    }
})


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
    const deletedTodo = await todosService.deleteTodo(req);
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
