"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const user_routes_1 = require("./routes/user.routes");
const connectDb_1 = __importDefault(require("./config/connectDb"));
const note_routes_1 = require("./routes/note.routes");
(0, dotenv_1.config)();
(0, connectDb_1.default)();
const app = (0, express_1.default)();
const { PORT } = process.env;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", user_routes_1.userRoutes);
app.use("/note", note_routes_1.noteRouter);
app.get("/", (req, res) => {
    res.send("Welcome to my api");
});
app.listen(PORT, () => console.log("server running"));
