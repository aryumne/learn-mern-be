import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import HttpError from "../models/HttpError.js";
import { Slugable } from "../utils/Slugable.js";
import { validationResult } from "express-validator";

const storeBlog = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { title, description, author } = req.body;
    const newBlog = new Blog({
        title: title,
        slug: Slugable(title),
        description: description,
        author: author,
        created_at: new Date()
    });

    let user;
    try {
        user = await User.findById(author);
        if (!user) return next(new HttpError('User not found!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newBlog.save({ session: sess });
        user.blogs.push(newBlog);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (e) {
        return res.status(422).json(e);
    }

    res.status(201)
    res.json({ message: 'Blog was created successfully!' });
}

const getBlogs = async (req, res, next) => {
    let Blogs = [];
    try {
        Blogs = await Blog.find();
        if (Blogs.length === 0) return next(new HttpError('Blogs is empty, please create your best blog!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200)
    res.json({ data: Blogs.map(blog => blog.toObject({ getters: true })) });
}

const getBlogBySlug = async (req, res, next) => {
    let blog = {};
    try {
        blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return next(new HttpError('Blog is empty, please check your slug!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200)
    res.json({ data: blog.toObject({ getters: true }) });
}

const getBlogsByAuthor = async (req, res, next) => {
    let blogsUser = [];
    try {
        // query at below equivalen with query sql such as 'select * from blogs inner join users where user_id=uid
        blogsUser = await User.findById(req.params.uid).populate('blogs');
        if (blogsUser.lenght === 0) return next(new HttpError('You have not any blog, please create your best blog!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200)
    res.json({ data: blogsUser.blogs.map(blog => blog.toObject({ getters: true })) });
}

const updateBlog = async (req, res, next) => {
    const { title, description, author } = req.body;
    let blog;
    // find the blog using params bid
    try {
        blog = await Blog.findById(req.params.bid);
        if (!blog) return next(new HttpError('Upss.. the blog not found!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }

    // resign value if there are changed
    if (title !== blog.title) {
        blog.title = title;
        blog.slug = Slugable(title);
    }
    if (description !== blog.description) {
        blog.description = description;
    }
    blog.author = author;

    //save changes
    try {
        await blog.save();
    } catch (e) {
        return res.status(422).json(e);
    }

    res.status(200)
    res.json({ message: 'The blog has been updated successfully!' })
}

const deleteBlog = async (req, res, next) => {
    let blog;
    // find the blog using params bid
    try {
        blog = await Blog.findById(req.params.bid).populate('author');
        if (!blog) return next(new HttpError('Upss.. the blog not found!', 404));
    } catch (e) {
        return res.status(400).json(e);
    }
    //delete the blog
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await blog.remove({ session: sess });
        blog.author.blogs.pull(blog);
        await blog.author.save({ session: sess });
        await sess.commitTransaction();
    } catch (e) {
        return res.status(422).json(e);
    }

    res.status(200)
    res.json({ message: 'The blog has been deleted successfully!' })
}
const BlogController = {
    storeBlog,
    getBlogs,
    getBlogBySlug,
    getBlogsByAuthor,
    updateBlog,
    deleteBlog
}

export default BlogController;