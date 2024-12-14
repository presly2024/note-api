import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Router, Request, Response } from "express";
import { auth } from "../middleWare/authMiddleWare";

const { JWT_SECRET } = process.env;
const route = Router();

route.get("/", auth, async (req: Request | any, res: Response) => {
     const id = req.user;
     try {
          const user = await User.findOne({ _id: id });

          if (!user) {
               return res
                    .status(400)
                    .json({ error: true, msg: "user not found" });
          }

          res.status(200).json({
               user,
          });
     } catch (error) {
          console.log(error);

          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

route.post("/register", async (req: Request, res: Response) => {
     const { name, email, password } = req.body;

     try {
          const userExist = await User.findOne({ email });

          if (userExist) {
               return res
                    .status(400)
                    .json({ error: true, msg: "user already exist" });
          }

          const user = new User({
               name,
               email,
               password,
          });

          await user.save();

          const token = await jwt.sign({ id: user._id }, `${JWT_SECRET}`, {
               expiresIn: 60 * 60 * 1000,
          });

          res.status(201).json({
               token,
               user,
          });
     } catch (error) {
          console.log(error);

          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

route.post("/login", async (req: Request, res: Response) => {
     const { email, password } = req.body;

     if (!email || !password) return console.log("empty fields");

     try {
          const user = await User.findOne({ email });

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

          const token = await jwt.sign({ id: user._id }, `${JWT_SECRET}`, {
               expiresIn: 60 * 60 * 1000,
          });

          res.status(201).json({
               token,
               user,
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: true, msg: "Internal server error" });
     }
});

export { route as userRoutes };
