import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'slug is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    created_at: {
        type: Date,
        required: [true, 'When you do that?']
    },

    author: {
        type: mongoose.Types.ObjectId,
        required: [true, 'You do not have access here!'],
        ref: 'User'
    }
})

BlogSchema.plugin(mongooseUniqueValidator);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;