import express from 'express'
const user = express.Router();

import { registerUser ,loginUser } from '../controller/user_Controller.js';

user.post('/register', registerUser);
user.post('/login', loginUser);

export default user
