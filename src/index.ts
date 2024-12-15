import express, { Express } from "express";
import cors from "cors";
import { config } from "dotenv";
import { userRoutes } from "./routes/user.routes";
import connectDB from "./config/connectDb";
import { noteRouter } from "./routes/note.routes";
config();

connectDB();
const app: Express = express();
const { PORT } = process.env;
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
     res.send("Welcome to my api");
});

app.listen(PORT, () => console.log("server running"));
