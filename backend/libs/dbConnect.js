import mongoose from "mongoose";

mongoose.connection.on('error', (error) => {
    console.log('DB after initial connection:', error);
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export default connectDB;