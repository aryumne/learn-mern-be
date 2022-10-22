import Blogs from "../dummies/Blogs.js";
import HttpError from "../models/HttpError.js";
import { NowLL } from "../utils/MomentId.js";
import { Slugable } from "../utils/Slugable.js";
import { validationResult } from "express-validator";
import { v4 as uid } from 'uuid';

const getAllBlogs = (req, res, next) => {
    if (!Blogs.length) {
        return next(new HttpError('could not find a blog.', 404))
    }
    res.json(Blogs)
    res.end();
}

const getBlogBySlug = (req, res, next) => {
    const blog = Blogs.find(b => (b.slug === req.params.slug));
    if (!blog) {
        throw new HttpError('could not find a blog for the provided slug.', 404);
    }
    res.json(blog)
    res.end();
}

const getBlogsByAuthor = (req, res, next) => {
    const blog = Blogs.filter(b => (b.author === req.params.uid));
    if (!blog.length) {
        return next(new HttpError('could not find a blog for the provided author!', 404))
    }
    res.json(blog)
    res.end();
}
const storeNewBlog = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { title, description, author } = req.body;
    const CreatedBlog = {
        id: uid(),
        slug: Slugable(title),
        title,
        description,
        created_at: NowLL,
        author
    };
    Blogs.push(CreatedBlog);
    res.status(201)
    res.json({ message: CreatedBlog })
}

const updateBlog = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { title, description, author } = req.body;
    const blog = Blogs.find(b => (b.slug === req.params.slug));
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.author = author || blog.author;
    res.status(201)
    res.json({ message: blog });
}

const deleteBlog = (req, res, next) => {
    Blogs = Blogs.filter(blog => blog.slug !== req.params.slug)
    res.status(201)
    res.json({ message: Blogs });
}



const BlogWithoutMongooseController = {
    getAllBlogs,
    getBlogBySlug,
    getBlogsByAuthor,
    storeNewBlog,
    updateBlog,
    deleteBlog
}
export default BlogWithoutMongooseController