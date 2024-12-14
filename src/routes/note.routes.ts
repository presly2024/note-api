import { Request, Response, Router } from "express";
import { auth } from "../middleWare/authMiddleWare";
import Note from "../models/notes";

const router = Router();

router.get("/", auth, async (req: Request | any, res: Response) => {
     const id = req.user;
     try {
          const notes = await Note.find({ creatorId: id });
          res.status(200).json(notes);
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

router.post("/create", auth, async (req: Request | any, res: Response) => {
     const id = req.user;
     const { title, content, tags } = req.body;
     try {
          const note = new Note({ title, content, tags, creatorId: id });
          if (!note) {
               res.status(400).json({
                    error: true,
                    msg: "failed to create note",
               });
          }
          await note.save();
          res.status(201).json(note);
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

router.put("/edit/:id", auth, async (req: Request | any, res: Response) => {
     const userId = req.user;
     const { title, content, tags } = req.body;
     const noteId = req.params.id;
     try {
          const note = await Note.findOne({ creatorId: userId, _id: noteId });
          if (!note) {
               return res
                    .status(404)
                    .json({ error: true, msg: "note note found" });
          }

          note.title = title;
          note.content = content;
          note.tags = tags;

          await note.save();
          res.status(200).json(note);
     } catch (error) {
          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

router.delete(
     "/delete/:id",
     auth,
     async (req: Request | any, res: Response) => {
          const userId = req.user;
          const noteId = req.params.id;
          try {
               const note = await Note.findOneAndDelete({
                    creatorId: userId,
                    _id: noteId,
               });
               if (!note) {
                    return res
                         .status(404)
                         .json({ error: true, msg: "note not found" });
               }

               res.status(200).json(note);
          } catch (error) {
               res.status(500).json({
                    error: true,
                    msg: "Internal server error",
               });
          }
     }
);

router.patch("/pin/:id", auth, async (req: Request | any, res: Response) => {
     const userId = req.user;
     const noteId = req.params.id;
     try {
          const note = await Note.findOne({
               creatorId: userId,
               _id: noteId,
          });
          if (!note) {
               return res
                    .status(404)
                    .json({ error: true, msg: "note not found" });
          }

          note.isPinned = note.isPinned ? false : true;
          await note.save();
          res.status(200).json(note);
     } catch (error) {
          res.status(500).json({
               error: true,
               msg: "Internal server error",
          });
     }
});

export { router as noteRouter };
