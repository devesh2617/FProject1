import express from "express";

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const Router = express.Router();

Router.post("/create-order", async (req: Request, res: Response) => {});
export default Router;
