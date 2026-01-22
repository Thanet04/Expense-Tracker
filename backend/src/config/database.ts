import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// MySQL Connection Pool
let mysqlPool: mysql.Pool | null = null;

export const connectMySQL = async (): Promise<void> => {
  try {
    mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '1234',
      database: process.env.MYSQL_DATABASE || 'expense_tracker',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await mysqlPool.getConnection();
    await connection.ping();
    connection.release();
    
    console.log('✅ MySQL connected successfully');
  } catch (error) {
    console.error('❌ MySQL connection error:', error);
    process.exit(1);
  }
};

export const getMySQLPool = (): mysql.Pool => {
  if (!mysqlPool) {
    throw new Error('MySQL pool is not initialized. Call connectMySQL() first.');
  }
  return mysqlPool;
};

// Disconnect all databases
export const disconnectDatabases = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('✅ MongoDB disconnected');
    }
    
    if (mysqlPool) {
      await mysqlPool.end();
      mysqlPool = null;
      console.log('✅ MySQL disconnected');
    }
  } catch (error) {
    console.error('❌ Error disconnecting databases:', error);
  }
};
