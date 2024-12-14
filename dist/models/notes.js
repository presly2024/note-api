"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "title is required"],
    },
    content: {
        type: String,
        required: [true, "content is required"],
    },
    tags: {
        type: Array(String),
        default: [],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
});
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
