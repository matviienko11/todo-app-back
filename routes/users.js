import {Router} from "express";
import { usersService } from "../services/users.service";
import { isAuthorized } from "../middleware/auth";

const router = new Router();

//Add isAuthorized here
router.get("/users", async (req, res) => {
    try {
        res.json({
            status: "The full list of registered users",
            data: await usersService.getAllUsers()
        })
    } catch (error) {
        res.json({
            status: "No list",
            data: error
        })
    }
});

router.post("/users", async (req, res) => {
    try {
        if(await usersService.getUserByEmail(req)) {
            res.json({
                status: "Sorry, but user with such EMAIL already exists"
            })
        } else {
            res.json({
                status: "User has been registered",
                data: await usersService.createUser(req)
            })
        }
    } catch (error) {
        res.json({
            status: "Something wrong",
            data: error
        })
    }
});

export default router;
