import mongoose from 'mongoose';

async function connectDB(mongoUri) {
  const uri = mongoUri || process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not provided — skipping database connection');
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DBNAME || undefined,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // In an educational demo we don't crash the whole server by default.
    // Re-throw if you want the process to exit on DB failure:
    // throw err;
  }
}

export default connectDB;
