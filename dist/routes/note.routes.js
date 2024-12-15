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
exports.noteRouter = void 0;
const express_1 = require("express");
const authMiddleWare_1 = require("../middleWare/authMiddleWare");
const notes_1 = __importDefault(require("../models/notes"));
const router = (0, express_1.Router)();
exports.noteRouter = router;
router.get("/", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    try {
        const notes = yield notes_1.default.find({ creatorId: id });
        res.status(200).json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
router.post("/create", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    const { title, content, tags } = req.body;
    try {
        const note = new notes_1.default({ title, content, tags, creatorId: id });
        if (!note) {
            res.status(400).json({
                error: true,
                msg: "failed to create note",
            });
        }
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
router.put("/edit/:id", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const { title, content, tags } = req.body;
    const noteId = req.params.id;
    try {
        const note = yield notes_1.default.findOne({ creatorId: userId, _id: noteId });
        if (!note) {
            return res
                .status(404)
                .json({ error: true, msg: "note note found" });
        }
        note.title = title;
        note.content = content;
        note.tags = tags;
        yield note.save();
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ error: true, msg: "Internal server error" });
    }
}));
router.delete("/delete/:id", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const noteId = req.params.id;
    try {
        const note = yield notes_1.default.findOneAndDelete({
            creatorId: userId,
            _id: noteId,
        });
        if (!note) {
            return res
                .status(404)
                .json({ error: true, msg: "note not found" });
        }
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({
            error: true,
            msg: "Internal server error",
        });
    }
}));
router.patch("/pin/:id", authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const noteId = req.params.id;
    try {
        const note = yield notes_1.default.findOne({
            creatorId: userId,
            _id: noteId,
        });
        if (!note) {
            return res
                .status(404)
                .json({ error: true, msg: "note not found" });
        }
        note.isPinned = note.isPinned ? false : true;
        yield note.save();
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({
            error: true,
            msg: "Internal server error",
        });
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_1.default.find();
        res.status(200).json(notes);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}));
