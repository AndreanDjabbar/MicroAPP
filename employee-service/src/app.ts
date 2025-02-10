import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './configs/dbInit.js';
import router from './routes/mainRoutes.js';

const app = express();

app.use(express.json());
initializeDatabase();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use('/employee', router);

export default app;