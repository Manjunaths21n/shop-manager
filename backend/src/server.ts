import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Check with: http://localhost:${PORT}/`);
});