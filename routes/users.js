import {Router} from "express";
import {isAuthorized} from "../services/auth";
import bcrypt from "bcrypt";
import { User } from "../models/User";


const router = new Router();
const userList = [];

//I need to add isAuthorized here!!!
router.get("/users",  async (req, res) => {
    await User.findAll().then((users) => {
      res.json(users);
      console.log(users);
    })

});

router.post("/users", async (req, res) => {
   try {
       const findUserByEmail = await User.findOne({
           where: {
               email: req.body.email
           }
       })
       console.log("USEREMAIL", findUserByEmail)

       if(findUserByEmail) {
           res.json({
               status: "Sorry, but user with such EMAIL already exists"
           })
       } else {
           const hashedPassword = await bcrypt.hash(req.body.password, 10)
           const newUser = await User.sync().then(() => {

               return User.create({
                   id: req.body.id,
                   name: req.body.name,
                   email: req.body.email,
                   password: hashedPassword
               })

           })
           userList.push(newUser);
           console.log("NEWUSER", newUser);
           console.log("HASEDPASSWORD", hashedPassword)

           res.json({
               status: "created",
               data: userList
           })
       }
   } catch (err) {
       console.log(err);
       res.json(err);
   }
});


export default router;
