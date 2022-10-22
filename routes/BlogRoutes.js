import { Router } from "express";
import Authentication from "../middlewares/Authentication.js";
import BlogController from "../controllers/BlogController.js";
import { body } from 'express-validator';

const BlogRoutes = Router();
// before middleware authentication, these routes are public
BlogRoutes.get('/', BlogController.getBlogs);
BlogRoutes.get('/:slug', BlogController.getBlogBySlug);

//middleware authentication 
// BlogRoutes.use(Authentication);

//after middleware authentication, these routes are private
BlogRoutes.get('/user/:uid', BlogController.getBlogsByAuthor);
BlogRoutes.post('/', [body('title').not().isEmpty()], BlogController.storeBlog);
BlogRoutes.patch('/:bid', BlogController.updateBlog);
BlogRoutes.delete('/:bid', BlogController.deleteBlog);

export default BlogRoutes;