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
exports.userRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const express_1 = require("express");
const authMiddleWare_1 = require("../middleWare/authMiddleWare");
const { JWT_SECRET } = process.env;
const route = (0, express_1.Router)();
exports.userRoutes = route;
route.get("/", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    try {
        const user = yield user_1.User.findOne({ _id: id });
        if (!user) {
            return res
                .status(400)
                .json({ error: true, msg: "user not found" });
        }
        res.status(200).json({
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
route.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userExist = yield user_1.User.findOne({ email });
        if (userExist) {
            return res
                .status(400)
                .json({ error: true, msg: "user already exist" });
        }
        const user = new user_1.User({
            name,
            email,
            password,
        });
        yield user.save();
        const token = yield jsonwebtoken_1.default.sign({ id: user._id }, `${JWT_SECRET}`, {
            expiresIn: 60 * 60 * 1000,
        });
        res.status(201).json({
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
route.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return console.log("empty fields");
    try {
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ error: true, msg: "user doesn't exist" });
        }
        if (!(user.password === password)) {
            return res
                .status(400)
                .json({ error: true, msg: "wrong password" });
        }
        const token = yield jsonwebtoken_1.default.sign({ id: user._id }, `${JWT_SECRET}`, {
            expiresIn: 60 * 60 * 1000,
        });
        res.status(201).json({
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
