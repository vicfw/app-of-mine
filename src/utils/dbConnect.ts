import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => mongoose.connect(MONGODB_URI as string);

export default dbConnect;
