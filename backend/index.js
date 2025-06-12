import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import Router from './routes/route.js';
import noteRouter from './routes/noteRoutes.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: [
        "https://notes-web-app-phi.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
}));
app.use(express.json());
app.use('/api', Router);
app.use('/api/notes', noteRouter);

const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;

Connection(URL);
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
