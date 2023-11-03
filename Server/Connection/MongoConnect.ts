import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL: string | undefined = process.env.MONGO_URL;

const Connection = async () => {
  try {
    if (MONGO_URL !== undefined) {
      await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log(" Database connected to webAppliation-2");
    }
  } catch (error: any) {
    console.log(`error in database connection:${error.message}`);
  }
};

export default Connection;
