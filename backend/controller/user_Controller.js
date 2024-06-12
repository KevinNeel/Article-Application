import jwt from 'jsonwebtoken';

//Model
import User from '../model/User.js';

export const registerUser = async(req, res)=>{
    try {

        const saveUser = await User({ username: "user1", email: "user1@gmail.com", password: "user1" });
        await saveUser.save();
        res.status(201).json({ message: "User Registered" });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"})
    }
}

export const loginUser = async(req, res)=>{
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).lean();

        if (!user) return res.status(404).json({ message: 'User does not exist' });

        if(password != user.password) return res.status(401).json({ message: "Invalid Password" });

        const token = jwt.sign({ user: user.id, email: user.email }, process.env.JWT_KEY_KEY, { expiresIn: '1d' });

        let loginedUser = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        res.status(200).json({ user: loginedUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"})
    }
}



