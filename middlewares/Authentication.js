import HttpError from "../models/HttpError.js";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
    try {
        const getToken = req.headers.authorization.split(' ');
        const token = getToken[getToken.length - 1];
        if (!token) {
            throw new HttpError('Unauthenticated!', 401);
        }
        const decodeToken = jwt.verify(token, 'key_of_my_token');
        req.userData = { uid: decodeToken.uid };
        next()
    } catch (e) {
        return next(new HttpError('Unauthenticated!', 401));
    }
}