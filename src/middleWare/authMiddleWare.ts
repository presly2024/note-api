import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const auth = async (req: Request | any, res: Response, next: NextFunction) => {
     let token;

     if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
     ) {
          token = req.headers.authorization.split(" ")[1];

          try {
               const decode: any = await jwt.verify(token, `${JWT_SECRET}`);
               req.user = decode.id;
               next();
          } catch (error) {
               console.log(error);
               res.status(401).send("Not authorised");
          }
     }

     if (!token) {
          res.status(401).send("Not authorised, no token");
     }
};

export { auth };
