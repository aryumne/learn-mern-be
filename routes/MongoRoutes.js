import { Router } from "express";
import MongoController from "../controllers/MongoController.js";

const MongoRoutes = Router();


MongoRoutes.get('/', MongoController.getProduct);
MongoRoutes.post('/', MongoController.storeProduct);

export default MongoRoutes;
