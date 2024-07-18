const router = require("express").Router();
const { prisma } = require("../db");

// Tag Routes
// GET all tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// GET tag by id
router.get("/tags/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: { decks: true, cards: true }
    });
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
});

// POST new tag
router.post("/tags", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newTag = await prisma.tag.create({
      data: { name }
    });
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
});

// PUT update tag
router.put("/tags/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name }
    });
    res.json(updatedTag);
  } catch (error) {
    next(error);
  }
});

// DELETE tag
router.delete("/tags/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.tag.delete({ where: { id } });
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;