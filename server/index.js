import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { borrowerRoutes } from './routes/borrowerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/borrowers', borrowerRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Database connection
const connectDB = async () => {
  try {
    // Note: In a real production environment, you'd use a real MongoDB connection URI
    // For demo purposes, we'll use a placeholder that will console log connections
    console.log('MongoDB would connect here in production');
    console.log('For this demo, we\'ll simulate database operations');
    
    // The actual connection would look like this:
    // await mongoose.connect(process.env.MONGODB_URI);
    // console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;