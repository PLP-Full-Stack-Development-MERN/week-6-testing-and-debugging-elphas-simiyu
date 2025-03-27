
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bugRoutes from './routes/bugs';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://elphassimiyu123:elphassimiyu123@taskmanager.65min.mongodb.net/?retryWrites=true&w=majority&appName=taskManager';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bugs', bugRoutes);

// Error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app;
