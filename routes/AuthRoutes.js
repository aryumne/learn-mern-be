import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { body } from 'express-validator';

const AuthRoutes = Router();

AuthRoutes.post('/register', [
    body('name').not().isEmpty(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty()
], AuthController.signup);
AuthRoutes.post('/login', [
    body('email').not().isEmpty(),
    body('password').not().isEmpty()
], AuthController.signin);
AuthRoutes.get('/user/:uid', AuthController.getUser);
export default AuthRoutes;