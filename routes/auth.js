import {Router} from "express";
import jwt from "jsonwebtoken";
import {privateKey} from "../services/auth";
import bcrypt from "bcrypt";
import {User} from "../models/User";




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
                status: "Wrong password",
                data: "Wrong password"
            })
        }
    } else {
        res.json ({
            status: "Wrong user",
            data: "Wrong user"
        })
    }
});

export default router;
