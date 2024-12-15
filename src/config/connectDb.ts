import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

const { NODE_ENV, MONGODB_URI } = process.env;

const connectDB = async () => {
     if (cachedConnection) {
          console.log("Using cached connection");
          return cachedConnection;
     }
     try {
          const connecting = await mongoose.connect(
               String(NODE_ENV) === "development"
                    ? "mongodb://localhost:27017/"
                    : (MONGODB_URI as string),
               {
                    dbName: "notes",
               }
          );
          cachedConnection = connecting.connection;
          console.log("Using new connection");
          return cachedConnection;
     } catch (error) {
          console.log("Failed to connect to database");
          throw new Error("Failed to connect");
     }
};

export default connectDB;
