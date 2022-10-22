import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        validate: {
            validator: (val) => (/^\S+@unipa.ac.id+$/.test(val)),
            message: "Please use unipa's email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [6, 'Please type a password, at least 6 characters!']
    },
    image: {
        type: String,
        required: [true, 'Please upload your photo!']
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        required: [true, 'You do not have any blog!'],
        ref: 'Blog'
    }]
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;