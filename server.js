import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './database/db.connect.js';
import router from './routes/todoRoutes.js';

// Load environment variables - this MUST be at the very top
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

app.use('/api', router);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: "Something went wrong!", 
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();