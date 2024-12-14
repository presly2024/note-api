import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;
const connectDB = async () => {
     if (cachedConnection) {
          console.log("Using cached connection");
          return cachedConnection;
     }
     try {
          const connecting = await mongoose.connect(
               "mongodb://localhost:27017/note"
          );
          cachedConnection = connecting.connection;
          console.log("Using new connection");
          return cachedConnection;
     } catch (error) {
          throw new Error("Failed to connect");
     }
};

export default connectDB;
