import { Router } from "express";
import MongooseController from "../controllers/MongooseController.js";

const MongooseRoutes = Router();


MongooseRoutes.get('/', MongooseController.getTodos);
MongooseRoutes.post('/', MongooseController.storeTodo);

export default MongooseRoutes;