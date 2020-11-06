import { Router } from "express";
import jwt from "jsonwebtoken";
import { privateKey } from "../services/auth";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const router = new Router();

router.post("/login", async (req, res) => {

    const user = await User.findOne({
        where: {
            name: req.body.name
        }
    })
    console.log("USER", user);

    if (user) {
        const isPassValid = await bcrypt.compare(req.body.password, user.password);
        console.log("ISPASSVALID", isPassValid)

        if (isPassValid) {
            const token = jwt.sign({
                id: user.id
            }, privateKey);
            console.log("TOKEN", token);

            return res.json({
                status: "Authorized",
                data: {
                    token
                }
            })
        } else {
            res.json ({
                status: "Wrong credentials, try again",
                data: "Wrong credentials, try again"
            })
        }
    } else {
        res.json ({
            status: "Wrong credentials, try again",
            data: "Wrong credentials, try again"
        })
    }
});

export default router;
