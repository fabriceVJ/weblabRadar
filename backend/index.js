import express from 'express';
import authRoutes from './authRoutes.js'
import protectedRoutes from './protectedRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

import connectDB from './db.js'

const PORT = process.env.BACKEND_PORT
const app = express();

connectDB()
app.use(express.json())

app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


app.listen(PORT, () => {
    console.log("backend is running on port " + PORT);
});