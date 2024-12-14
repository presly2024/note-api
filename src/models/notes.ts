import { Schema, model } from "mongoose";

type TNote = {
     creatorId: string | any;
     title: string;
     content: string;
     tags: string[];
     date: Date;
     isPinned: boolean;
};

const noteSchema = new Schema<TNote>({
     creatorId: {
          type: Schema.Types.ObjectId,
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

const Note = model("Note", noteSchema);
export default Note;
