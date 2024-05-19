import express from "express";
import { AppDataSource } from "../data-source";

const router = express.Router();

router.get("/posts", async (req, res) => {
  const { page = 1, size = 10, search = "" } = req.query;

  const offset = (parseInt(page as string) - 1) * parseInt(size as string);
  const limit = parseInt(size as string);

  try {
    const data = await AppDataSource.manager.find("Post", {
      skip: offset,
      take: limit,
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users", async (req, res) => {
  const { page = 1, size = 10, search = "" } = req.query;

  const offset = (parseInt(page as string) - 1) * parseInt(size as string);
  const limit = parseInt(size as string);

  try {
    const data = await AppDataSource.manager.find("User");

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
