import jwt from "jsonwebtoken";
import {listUsers} from "../routes";


export const privateKey = 'secret';
export const options = {
    algorithm: 'RS256'
};


export function isAuthorized(req, res, done) {
    const token = req.headers['authorization'];

    console.log('TOKEN', token);

    const parsedToken = jwt.verify(token, privateKey);

    const user = listUsers.find((u) => u.id === parsedToken.id)

    console.log(user)

    if (!user) {
        res.statusCode = 401;

        res.json({
            error: 'Unauthorized'
        })
    } else {
        done();
    }
}


