// import express from "express"; //cara penulisan pertama
// const BlogRoutes = express.Router(); // cara penulisan pertama

import { Router } from "express"; //cara penulisan kedua
import HttpError from "../models/HttpError.js";
import { Buffer } from 'node:buffer';
import BlogWithoutMongoose from "../controllers/BlogWithoutMongooseController.js";
import { body } from 'express-validator';
import Blogs from "../dummies/Blogs.js";


const BlogTestRoutes = Router(); //cara penulisan kedua

// Script yang dikomentari adalah contoh route tanpa menggunakan controller
BlogTestRoutes.get('/', (req, res) => {
    const buf = Buffer.from(JSON.stringify(Blogs));
    res.json(buf);
    res.end();
})

BlogTestRoutes.get('/:slug', (req, res, next) => {
    const blog = Blogs.find(b => (b.slug === req.params.slug));
    // if (!blog) return res.status(404).json({ message: 'could not find a blog for the provided slug.' });
    if (!blog) {
        throw new HttpError('could not find a blog for the provided slug.', 404);
    }
    const buf = Buffer.from(JSON.stringify(blog));
    res.json(buf)
    res.end();
})
BlogTestRoutes.get('/user/:uid', (req, res, next) => {
    const blog = Blogs.filter(b => (b.author === req.params.uid));
    if (!blog.length) {
        return next(new HttpError('could not find a blog for the provided author!', 404))
    }
    res.json(blog)
    res.end();
})


// Route yang logicnya dipisah ke controller
BlogTestRoutes.get('/', BlogWithoutMongoose.getAllBlogs);
BlogTestRoutes.get('/:slug', BlogWithoutMongoose.getBlogBySlug);
BlogTestRoutes.get('/user/:uid', BlogWithoutMongoose.getBlogsByAuthor);
BlogTestRoutes.post('/', [body('title').not().isEmpty()], BlogWithoutMongoose.storeNewBlog);
BlogTestRoutes.patch('/:slug', [body('title').not().isEmpty()], BlogWithoutMongoose.updateBlog);
BlogTestRoutes.delete('/:slug', BlogWithoutMongoose.deleteBlog);



export default BlogTestRoutes;