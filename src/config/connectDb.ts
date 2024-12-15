import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let cachedConnection: Connection | null = null;

const { NODE_ENV, MONGODB_URI } = process.env;
const url =
     String(NODE_ENV) === "development"
          ? "mongodb://localhost:27017/"
          : (MONGODB_URI as string);

const connectDB = async () => {
     if (cachedConnection) {
          console.log("Using cached connection");
          return cachedConnection;
     }
     try {
          const connecting = await mongoose.connect(url, {
               dbName: "notes",
          });
          cachedConnection = connecting.connection;
          console.log("Using new connection");
          return cachedConnection;
     } catch (error) {
          console.log("Failed to connect to database");
          throw new Error("Failed to connect");
     }
};

export default connectDB;
