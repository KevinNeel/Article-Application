import jwt from 'jsonwebtoken';

import User from '../model/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token,process.env.JWT_KEY_KEY);
        let decodeData;
        console.log('inside middleware');
        if (token) {
            decodeData = jwt.verify(token, process.env.JWT_KEY_KEY);
            console.log(decodeData);

            if (!decodeData) return res.status(498).json({ message: 'Invalid Token' });

            console.log(decodeData);

            let email = decodeData.email;

            // const userId = req.body.userId;

            // console.log(userId, "This is user");

            const user = await User.findOne({ email: email }).lean();

            if (!user) return res.status(404).json({ message: "Invalid User" });
            req.userId = user._id;
            
        } else {
            return res.status(404).json({ message: "Unauthorized" })
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Token Expired' })
    }
}

export default authMiddleware;