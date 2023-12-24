import express from "express";
const Router = express.Router();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

Router.post("/create-role", async (req: Request, res: Response) => {
  try {
    const role = req.body.role;

    // Check if the role already exists
    const existingRole = await prisma.userRole.findFirst({
      where: { role },
    });

    if (existingRole) {
      return res.status(409).json({ error: "Role already exists" });
    }

    // Create the user role with an empty array of users
    const newRole = {
      role,
      user: { create: [] }, // Empty array initialization
    };

    const createdRole = await prisma.userRole.create({ data: newRole });

    res.status(201).json({ message: "Role created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

Router.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    if (role === "admin") {
      const Role = await prisma.userRole.findFirst({
        where: { role },
      });
      const adminUser = await prisma.user.findFirst({
        where: {
          userRoleId: Role?.id,
        },
      });
      if (adminUser) {
        return res
          .status(409)
          .json({ error: "Admin already exists for this site" });
      }
    }
    // Hash the password
    const password = process.env.DEFAULT_PASSWORD;
    if (!password)
      return res.status(404).json({ error: "Default Password not found" });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the "admin" role in the database
    const Role = await prisma.userRole.findFirst({
      where: { role },
    });

    if (!Role) {
      return res.status(404).json({ error: "Role not found in the database" });
    }

    // Create the user with the "admin" role
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: { connect: { id: Role.id } },
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
