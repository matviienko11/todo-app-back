import { Router } from "express";
import { todosService } from "../services/todos.service";
import {usersService} from "../services/users.service";
import { isAuthorized } from "../middleware/auth";
import { generateDto } from "../utils/generate-dto";

const router = new Router;

router.get("/todos", isAuthorized, async (req, res) => {
    try {
        const allTodos = await todosService.getAllTodos();
        if(req.user.role !== "User") {
            res.json(generateDto(allTodos))
        } else {
            const certainTodos =  await todosService.getCertainTodos(req);
            res.json(generateDto(certainTodos))
        }
    } catch (error) {
        res.json({
            status: "Some error happened",
            data: error
        })
    }
})

router.post("/todos",async (req, res) => {
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

router.patch("/todos/:id", isAuthorized, async (req, res) => {
    try {
        if(req.user.role === "User") {
            const editedTodo = await todosService.editTodo(req);
            res.json({
                status: "Todo has been changed",
                data: editedTodo
            })
        } else {
            res.json ({
                status: "Sorry, only the user who created it can change it"
            })
        }
    } catch (error) {
        res.json({
            status: "No changes happened",
            data: error
        })
    }
})

export default router;
