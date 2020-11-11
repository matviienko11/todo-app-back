import jwt from "jsonwebtoken";
import { User } from "../models/User";


export const privateKey = process.env.PRIVATE_KEY || 'secret';
export const options = {
    algorithm: 'RS256'
};


export async function  isAuthorized(req, res, done) {
    const token = req.headers['authorization'];
    const parsedToken = jwt.verify(token, privateKey);
    const user = await User.findOne({
        where: {
            id: parsedToken.id
        }
    })
    // console.log('USER', user)

    if (!user) {
        res.statusCode = 401;
        res.json({
            status: 'Unauthorized'
        })
    } else {
        done();
    }
}

