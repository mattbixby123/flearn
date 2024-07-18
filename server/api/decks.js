const router = require("express").Router();
const { prisma } = require("../db");

// Deck Routes
// GET all decks
router.get("/decks", async (req, res, next) => {
  try {
    const decks = await prisma.deck.findMany();
    res.json(decks);
  } catch (error) {
    next(error);
  }
});

// GET deck by id
router.get("/decks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: { cards: true, tags: true }
    });
    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }
    res.json(deck);
  } catch (error) {
    next(error);
  }
});

// POST new deck
router.post("/decks", async (req, res, next) => {
  try {
    const { name, description, userId } = req.body;
    const newDeck = await prisma.deck.create({
      data: { name, description, userId }
    });
    res.status(201).json(newDeck);
  } catch (error) {
    next(error);
  }
});

// PUT update deck
router.put("/decks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedDeck = await prisma.deck.update({
      where: { id },
      data: { name, description }
    });
    res.json(updatedDeck);
  } catch (error) {
    next(error);
  }
});

// DELETE deck
router.delete("/decks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.deck.delete({ where: { id } });
    res.json({ message: "Deck deleted successfully" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;