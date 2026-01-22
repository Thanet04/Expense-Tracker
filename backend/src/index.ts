import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB, connectMySQL, disconnectDatabases } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Expense Tracker API is running',
    version: '1.0.0'
  });
});

app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Connect to databases and start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    
    // Connect to MySQL
    await connectMySQL();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await disconnectDatabases();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await disconnectDatabases();
  process.exit(0);
});

// Start the server
startServer();
