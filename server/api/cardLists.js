const router = require("express").Router();
const { prisma } = require("../db");

// GET all cardLists
router.get("/cardLists", async (req, res, next) => {
  try {
    const cardLists = await prisma.cardList.findMany({
      include: {
        user: { select: { username: true } },
        deck: { select: { name: true } },
        cards: true
      }
    });
    res.json(cardLists);
  } catch (error) {
    next(error);
  }
});

// GET cardList by id
router.get("/cardLists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cardList = await prisma.cardList.findUnique({
      where: { id },
      include: {
        user: { select: { username: true } },
        deck: { select: { name: true } },
        cards: true
      }
    });
    if (!cardList) {
      return res.status(404).json({ error: "CardList not found" });
    }
    res.json(cardList);
  } catch (error) {
    next(error);
  }
});

// POST new cardList
router.post("/cardLists", async (req, res, next) => {
  try {
    const { name, userId, deckId, cardIds } = req.body;
    const newCardList = await prisma.cardList.create({
      data: {
        name,
        userId,
        deckId,
        cards: {
          connect: cardIds.map(id => ({ id }))
        }
      },
      include: {
        user: { select: { username: true } },
        deck: { select: { name: true } },
        cards: true
      }
    });
    res.status(201).json(newCardList);
  } catch (error) {
    next(error);
  }
});

// PUT update cardList
router.put("/cardLists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, cardIds } = req.body;
    const updatedCardList = await prisma.cardList.update({
      where: { id },
      data: {
        name,
        cards: {
          set: cardIds.map(id => ({ id }))
        }
      },
      include: {
        user: { select: { username: true } },
        deck: { select: { name: true } },
        cards: true
      }
    });
    res.json(updatedCardList);
  } catch (error) {
    next(error);
  }
});

// DELETE cardList
router.delete("/cardLists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.cardList.delete({ where: { id } });
    res.json({ message: "CardList deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;