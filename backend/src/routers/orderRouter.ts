import express from "express";

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const Router = express.Router();

const multer = require("multer");

// Set up the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: Function) {
    cb(null, "../public/uploads/"); // Specify the directory where files will be stored
  },
  filename: function (req: Request, file: any, cb: Function) {
    cb(null, Date.now() + "-" + file.originalname); // Use unique filenames
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

Router.post(
  "/create-order",
  upload.array("images", 4)
  // async (req: Request, res: Response) => {
  //   const {
  //     name,
  //     code,
  //     orderDate,
  //     deliveryDate,
  //     type,
  //     typeOfMould,
  //     pattern,
  //     neelDesign,
  //     sideDesign,
  //     soleDesign,
  //     size,
  //     plateDrawingAndSize,
  //     nakkaFitting,
  //     expansion,
  //     notes,
  //   } = req.body;
  //   const
  //   try {
  //     const order = await prisma.orderDetails.create({
  //       data: {
  //         name,
  //         code,
  //         orderDate,
  //         deliveryDate,
  //         type,
  //         typeOfMould,
  //         pattern,
  //         neelDesign,
  //         sideDesign,
  //         soleDesign,
  //         size,
  //         plateDrawingAndSize,
  //         nakkaFitting,
  //         expansion,
  //         notes,
  //         images: {
  //           create: [],
  //         },
  //         user:{
  //           connect:{id:}
  //         }
  //       },
  //     });
  //   } catch (error) {}
  // }
);
export default Router;
