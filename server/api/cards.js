const router = require("express").Router();
const { prisma } = require("../db");

// Card Routes
// GET all cards
router.get("/cards", async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

// GET card by id
router.get("/cards/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await prisma.card.findUnique({
      where: { id },
      include: { tags: true }
    });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
});

// POST new card
router.post("/cards", async (req, res, next) => {
  try {
    const { front, back, deckId } = req.body;
    const newCard = await prisma.card.create({
      data: { front, back, deckId }
    });
    res.status(201).json(newCard);
  } catch (error) {
    next(error);
  }
});

// PUT update card
router.put("/cards/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { front, back } = req.body;
    const updatedCard = await prisma.card.update({
      where: { id },
      data: { front, back }
    });
    res.json(updatedCard);
  } catch (error) {
    next(error);
  }
});

// DELETE card
router.delete("/cards/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.card.delete({ where: { id } });
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    next(error);
  }
});



module.exports = router;