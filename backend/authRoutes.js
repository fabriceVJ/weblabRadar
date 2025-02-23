import express from "express";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();


const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username + " " + password);
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(400).send({message: 'Invalid credentials 1'});
        }
        const validPassword = bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).send({message: 'Invalid credentials 2'});
        }
        console.log(user)
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_IN_MINUTES + "m",
        })
        res.json({"token": token, "expiresIn": process.env.JWT_EXPIRE_IN_MINUTES});
    } catch (err) {
        res.status(500).send({message: err.message});
        console.log(err)
    }
}


const register = async (req, res) => {
    try {
        const {username, password, role} = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({username});
        console.log(userExists)
        if (userExists) {
            res.status(400).json({message: "User already exists"}).send();
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({username: username, password: hashedPassword, role: role});
        await newUser.save();

        // Respond with success
        res.status(201).json({message: "User created successfully"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
const logout = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // jwt. TODO logout function
}

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout)
export default authRouter;
