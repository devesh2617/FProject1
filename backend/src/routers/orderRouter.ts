import express, { NextFunction, response } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const Router = express.Router();

const multer = require("multer");

// Set up the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    const absolutePath = path.join(__dirname + "../public/uploads/");
    cb(null, absolutePath);
  },
  filename: function (req: Request, file: any, cb: any) {
    try {
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    } catch (error) {
      cb(error);
    }
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

function handleFileUpload(req: any, res: Response, next: NextFunction) {
  upload.array("images")(req, res, (err: any) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Error uploading files");
    }

    // Files are uploaded successfully
    console.log("Files uploaded:", req.files);
    next(); // Move on to the next middleware or route handler
  });
}

Router.post("/create-order", async (req: any, res: Response) => {
  const {
    name,
    code,
    orderDate,
    deliveryDate,
    type,
    typeOfMould,
    pattern,
    neelDesign,
    sideDesign,
    soleDesign,
    size,
    plateDrawingAndSize,
    nakkaFitting,
    expansion,
    notes,
  } = req.body;
  console.log(req.files);

  try {
    const order = await prisma.orderDetails.create({
      data: {
        name,
        code,
        orderDate,
        deliveryDate,
        type,
        typeOfMould,
        pattern,
        neelDesign,
        sideDesign,
        soleDesign,
        size,
        plateDrawingAndSize,
        nakkaFitting,
        expansion,
        notes,
        images: {
          create: [],
        },
        user: {
          connect: { id: req.userID },
        },
      },
    });
    if (!order)
      return res.status(501).json({
        error: "Order was not created",
      });
    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.send(500).json({ error: "Internal Server Error" });
  }
});
Router.post(
  "/upload-order-images",
  handleFileUpload,
  async (req: any, res: Response) => {
    console.log(req.files);
    // const {
    //   name,
    //   code,
    //   orderDate,
    //   deliveryDate,
    //   type,
    //   typeOfMould,
    //   pattern,
    //   neelDesign,
    //   sideDesign,
    //   soleDesign,
    //   size,
    //   plateDrawingAndSize,
    //   nakkaFitting,
    //   expansion,
    //   notes,
    // } = req.body;
    // console.log(req.files);

    // try {
    //   const order = await prisma.orderDetails.create({
    //     data: {
    //       name,
    //       code,
    //       orderDate,
    //       deliveryDate,
    //       type,
    //       typeOfMould,
    //       pattern,
    //       neelDesign,
    //       sideDesign,
    //       soleDesign,
    //       size,
    //       plateDrawingAndSize,
    //       nakkaFitting,
    //       expansion,
    //       notes,
    //       images: {
    //         create: [],
    //       },
    //       user: {
    //         connect: { id: req.userID },
    //       },
    //     },
    //   });
    //   if (!order)
    //     return res.status(501).json({
    //       error: "Order was not created",
    //     });
    //   return res.status(201).json({ message: "Order created successfully" });
    // } catch (error) {
    //   res.send(500).json({ error: "Internal Server Error" });
    // }
  }
);
export default Router;
