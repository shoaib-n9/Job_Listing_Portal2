import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utilities/database.js';
dotenv.config({}); //

const app = express();

// BELOW CODE IS FOR TESTING OF SERVER PROPERELY RUNNING OR NOT & AFTER TESTING WE CAN COMMENT IT.

/**
app.get('/home', (req, res) => {
  return res.status(200).json({
    message: 'from backend',
    success: true,
  });
});
**/

// ADDING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http//localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000; // IF EXIST PORT NO. WILL BE 8000 OTHERWISE 3000
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at PORT ${PORT}`);
});
