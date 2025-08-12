import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import itemsRoutes from './routes/item.routes.js';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow frontend origin and credentials for httpOnly cookie
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
