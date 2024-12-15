"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let cachedConnection = null;
const { NODE_ENV, MONGODB_URI } = process.env;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedConnection) {
        console.log("Using cached connection");
        return cachedConnection;
    }
    try {
        const connecting = yield mongoose_1.default.connect(String(NODE_ENV) === "development"
            ? "mongodb://localhost:27017/"
            : MONGODB_URI, {
            dbName: "notes",
        });
        cachedConnection = connecting.connection;
        console.log("Using new connection");
        return cachedConnection;
    }
    catch (error) {
        console.log("Failed to connect to database");
        throw new Error("Failed to connect");
    }
});
exports.default = connectDB;
