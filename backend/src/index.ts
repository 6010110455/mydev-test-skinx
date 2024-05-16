import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json());
// กำหนด middleware สำหรับใช้ CORS
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || "a4a00580f4a7c2fd99c71d974bead62eac1f30d09633026929a74f23b0b7890c";

AppDataSource.initialize()
  .then(async () => {
    app.post("/register", async (req, res) => {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User();
      user.username = username;
      user.password = hashedPassword;

      await AppDataSource.manager.save(user);

      res.send("User registered successfully");
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;

      const user = await AppDataSource.manager.findOne(User, {
        where: { username },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    });

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => console.log(error));
