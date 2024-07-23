const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.Google_client_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ firstName, lastName, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const googleLoginUser = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.Google_client_ID,
        });
        // console.log(ticket.getPayload());
        const payload = ticket.getPayload();
        const { sub, email, name } = payload;
        const [firstName, lastName = ''] = name.split(' ', 2); // Split name into first and last, default last to an empty string if not present

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                googleId: sub,
                email,
                firstName,
                lastName,
                password: 'defaultPassword'
            });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(401).json({ message: 'Google login failed' });
    }
};



module.exports = { registerUser, loginUser, googleLoginUser };
