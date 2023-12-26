import express, { Request, Response } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
const formData = require("express-form-data");
import orderRouter from "./routers/orderRouter";

import adminRouter from "./routers/adminRouter";
import bcrypt from "bcrypt";
import userIdentificationMiddleware from "./middlewares/userIdentificationMiddleware";
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Replace with your secret key
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
require("dotenv").config();
const prisma = new PrismaClient();
// Parse incoming requests with form data payloads
app.use(
  formData.parse({
    maxFileSize: 50 * 1024 * 1024,
  })
);
app.use(userIdentificationMiddleware);

const PORT = 3000;
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({
        error: "No user exists with this email",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      } else if (result) {
        const payload = {
          id: user.id,
          username: user.firstName + " " + user.lastName,
          email: user.email,
          role: user.role.role,
        };
        const options = {
          expiresIn: "24h", // Token expiration time
        };

        // Create the JWT
        const token = jwt.sign(payload, secretKey, options);
        return res.status(201).json({
          message: "Logged in successfully",
          token: token,
        });
      } else {
        return res.status(401).json({
          error: "Authentication error. Passwords don't match",
        });
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
