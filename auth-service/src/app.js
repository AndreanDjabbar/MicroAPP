import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { initializeDatabase } from './config/dbInit.js';

const app = express();

app.use(express.json());
initializeDatabase();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:3000",
        "http://localhost"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use('/auth', authRoutes);

export default app;