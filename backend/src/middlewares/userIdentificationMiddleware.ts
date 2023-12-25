import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const Middleware = async (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(409).json({ error: "JWT verification failed" });
      }
      // Token decoded successfully
      // console.log("Decoded token:", decoded);
      req.userID = decoded.id;
      req.userEmail = decoded.email;
      req.userRole = decoded.role;

      next();
    });
  }
};

export default Middleware;
