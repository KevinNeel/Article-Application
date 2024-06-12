import express from 'express';
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

import db_Connect from '../db_Conn/db_Conn.js';

//Routes
import user from '../routes/user_Route.js'
import article from '../routes/article_Route.js'

//port
const PORT = 8000 || process.env.PORT;

//databse connection
db_Connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', user);
app.use('/article', article);

app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
});