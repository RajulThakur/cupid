import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) {
      return mongoose.connections[0];
    }
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    return connection;
  } catch(error){
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error(error.message);
  }
};
