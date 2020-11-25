import { Router } from "express";
import { usersService } from "../services/users.service";
import jwt from "jsonwebtoken";
import {privateKey} from "../middleware/auth";
import {User} from "../models/User";
import {generateDto} from "../utils/generate-dto";

const router = new Router();

router.post("/users/login", async (req, res) => {
        const authedUser = await usersService.authUser(req);
        if(authedUser) {
            res.json(generateDto(authedUser))
        } else {
            res.json({
                status: "Authorization failed, check your login credentials"
            })
        }
});

export default router;
