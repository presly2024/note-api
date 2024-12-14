import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;
const connectDB = async () => {
     if (cachedConnection) {
          console.log("Using cached connection");
          return cachedConnection;
     }
     try {
          const connecting = await mongoose.connect(
               "mongodb+srv://preslytakopnfor:YDCnxPW48iSVkgoK@internship.5nayx.mongodb.net/",
               {
                    dbName: "notes",
               }
          );
          cachedConnection = connecting.connection;
          console.log("Using new connection");
          return cachedConnection;
     } catch (error) {
          throw new Error("Failed to connect");
     }
};

export default connectDB;
