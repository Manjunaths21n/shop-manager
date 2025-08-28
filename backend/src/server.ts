import doteEnv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { itemRouter } from './routers';

doteEnv.config();
const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', itemRouter)


app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API');
});

mongoose.connect(process.env.DB_URL ?? '').then(() => {
    console.log('MongoDB Connected Successfully!');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Check with: http://localhost:${PORT}/`);
    });
}).catch(() => {
    console.log('MongoDB Failed to Connect');
})
