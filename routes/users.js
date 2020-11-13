import {Router} from "express";
import { usersService } from "../services/users.service";
import { isAuthorized } from "../middleware/auth";
import {generateDto} from "../utils/generate-dto";

const router = new Router();

router.get("/users", isAuthorized, async (req, res) => {
    try {
        const getAllUsers = await usersService.getAllUsers();
        if(req.user.role === "Admin") {
            res.json(generateDto(getAllUsers))
        } else {
            res.json({
                status: "No rights"
            })
        }
    } catch (error) {
        res.json({
            status: "No list",
            data: error
        })
    }
});

router.post("/users", async (req, res) => {
    const existedUser = await usersService.getUserByEmail(req);
    const createdUser = await usersService.createUser(req);
        if(existedUser) {
            res.json({
                status: "Sorry, but user with such EMAIL already exists"
            })
        } else {
            res.json(generateDto(createdUser))
        }
});

export default router;
