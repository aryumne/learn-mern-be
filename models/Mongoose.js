import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required!'] },
    email: {
        type: String,
        validate: {
            validator: (val) => (/^\S+@unipa.ac.id+$/.test(val)),
            message: "Please use unipa's email"
        },
        required: [true, 'Email is required!']
    },
    todo: { type: String, required: [true, 'What do you want to do?'] },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;