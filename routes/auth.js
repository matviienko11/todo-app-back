import { Router } from "express";
import { usersService } from "../services/users.service";

const router = new Router();

router.post("/login", async (req, res) => {
    try {
        if(await usersService.authUser(req)) {
            res.json({
                status: "Authorized",
                data: await usersService.authUser(req)
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
