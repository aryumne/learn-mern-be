import express from "express";
import bodyParser from 'body-parser';
import HttpError from "./models/HttpError.js";
import mongoose, { mongo } from "mongoose";
import Routes from "./routes/index.js";
const url = 'mongodb+srv://be-mern:newpass@mern-db.ca3u4tj.mongodb.net/db-test?retryWrites=true&w=majority';

const app = express();

//app.user() merupakan sebuah middleware express yang berupa function untuk menangani request dan response dan juga meneruskan ke middleware selanjutnya (req,res,next)
//body parser allow to parsing body when client send request with body. 
app.use(bodyParser.json());

// set headers before list of routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
});

app.use('/api/blogtest', Routes.BlogTestRoutes);
app.use('/api/mongotest', Routes.MongoRoutes);
app.use('/api/mongoosetest', Routes.MongooseRoutes);

app.use('/api/blogs', Routes.BlogRoutes);
app.use('/api/auth', Routes.AuthRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    };
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
})

app.use(() => {
    throw new HttpError('Could not find this route!', 404);
})

mongoose.connect(url).then(() => {
    app.listen(5000);
    console.log('Connected!');
}).catch((e) => {
    console.info(e);
});