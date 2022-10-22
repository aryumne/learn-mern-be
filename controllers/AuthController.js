import User from "../models/User.js";
import HttpError from "../models/HttpError.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { name, email, password } = req.body;

    let existingUser;
    let hasHedPass;
    try {
        existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new HttpError('Sign up failed, email already exist!', 404);
        }
        hasHedPass = await bcrypt.hash(password, 10);
        if (!hasHedPass) {
            throw new HttpError('Sign up failed, please try again!', 400);
        }
    } catch (e) {
        if (e instanceof HttpError) {
            return next(e);
        } else {
            return next(new HttpError('Could not register, please try again later!'), 500);
        }
    }

    const newUser = new User({
        name,
        email,
        password: hasHedPass,
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        blogs: []
    });

    try {
        await newUser.save();
    } catch (e) {
        return res.status(422).json(e);
    }

    let token;
    try {
        token = jwt.sign({ uid: newUser.id, email: newUser.email }, 'key_of_my_token', { expiresIn: '1h', algorithm: 'HS256' });
    } catch (e) {
        return next(new HttpError('Could not create token, please try to login later!', 500));
    }

    res.status(201)
    res.json({ uid: newUser.id, email: newUser.email, token: token });
}

const signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { email, password } = req.body;

    let existingUser;
    let checkPass;
    try {
        existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            throw new HttpError('Invalid credentials, could not log you in.', 404);
        }
        checkPass = await bcrypt.compare(password, existingUser.password);
        if (!checkPass) {
            throw new HttpError('Invalid credentials, could not log you in.',
                400);
        }
    } catch (e) {
        console.log(e);
        if (e instanceof HttpError) {
            return next(e);
        } else {
            return res.status(500).json(e);
        }
    }

    let token;
    try {
        token = jwt.sign({ uid: existingUser.id, email: existingUser.email }, 'key_of_my_token', { expiresIn: '1h', algorithm: 'HS256' });
    } catch (e) {
        return next(new HttpError('Could not create token, please try to login later!', 500));
    }

    res.status(201)
    res.json({ uid: existingUser.id, email: existingUser.email, token: token });
}

const getUser = async (req, res, next) => {
    let user = {};
    try {
        user = await User.findById(req.params.uid);
        if (!user) throw new HttpError('User not found!', 404);
    } catch (e) {
        if (e instanceof HttpError) {
            return next(e);
        } else {
            return res.status(500).json(e);
        }
    }

    res.status(200)
    res.json({ data: user.toObject({ getters: true }) })
}

const AuthController = {
    signup,
    signin,
    getUser,
}

export default AuthController;