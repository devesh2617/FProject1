import express, { Request, Response } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import orderRouter from "./routers/orderRouter";
// import bodyParser from 'body-parser';
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
require("dotenv").config();
import adminRouter from "./routers/adminRouter";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Replace with your secret key

const prisma = new PrismaClient();
// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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
          username: user.firstName + " " + user.lastName,
          email: user.email,
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
