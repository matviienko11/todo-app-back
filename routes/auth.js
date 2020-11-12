import { Router } from "express";
import { usersService } from "../services/users.service";
import jwt from "jsonwebtoken";
import {privateKey} from "../middleware/auth";
import {User} from "../models/User";

const router = new Router();

router.post("/login", async (req, res) => {
    try {
        const authedUser = await usersService.authUser(req);
        if(authedUser) {
            res.json({
                status: "Authorized",
                data: authedUser
            })
        } else {
            res.json({
                status: "Authorization failed, check your login credentials"
            })
        }
    } catch (error) {
        res.json({
            status: "Error happened",
            data: error
        })
    }
});

export default router;
