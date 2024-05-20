import express from "express";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";

const router = express.Router();

router.get("/posts", async (req, res) => {
  const { page = 1, size = 10, search = "" } = req.query;

  const offset = (parseInt(page as string) - 1) * parseInt(size as string);
  const limit = parseInt(size as string);

  try {
    const data = await AppDataSource.manager.find("Post", {
      where: [{ title: Like(`%${search}%`) }, { tags: Like(`%${search}%`) }],
      skip: offset,
      take: limit,
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await AppDataSource.manager.findOne("Post", {
      where: { id: parseInt(id) },
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
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
