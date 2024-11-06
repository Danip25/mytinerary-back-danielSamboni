import mongoose from 'mongoose';
import { DB_URI } from '../config/env.config.js';
import { intializateCityModel } from '../scripts/createCity.script.js';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log({ DB_URI });
    console.log('MongoDB connected successfully');
    // await intializateCityModel();
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
