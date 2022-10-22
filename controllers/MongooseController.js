import Todo from "../models/Mongoose.js";

const storeTodo = async (req, res, next) => {
    const newTodo = new Todo({
        name: req.body.name,
        email: req.body.email,
        todo: req.body.todo,
    })
    try {
        await newTodo.save();
    } catch (e) {
        return res.status(422).json(e);
    }

    res.json({ message: 'success!' });
}

const getTodos = async (req, res, next) => {
    let todos;
    try {
        todos = await Todo.find().exec();
    } catch (error) {
        return res.status(402).json({ errors: error })
    }
    res.json({ todos })
}

const MongooseController = {
    storeTodo,
    getTodos
}

export default MongooseController;