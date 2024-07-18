const router = require("express").Router();
const { prisma } = require("../db");

// StudySession Routes
// GET all study sessions
router.get("/studySessions", async (req, res, next) => {
  try {
    const studySessions = await prisma.studySession.findMany();
    res.json(studySessions);
  } catch (error) {
    next(error);
  }
});

// GET study session by id
router.get("/studySessions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const studySession = await prisma.studySession.findUnique({
      where: { id }
    });
    if (!studySession) {
      return res.status(404).json({ error: "Study session not found" });
    }
    res.json(studySession);
  } catch (error) {
    next(error);
  }
});

// POST new study session
router.post("/studySessions", async (req, res, next) => {
  try {
    const { userId, deckId, startTime, endTime, score } = req.body;
    const newStudySession = await prisma.studySession.create({
      data: { userId, deckId, startTime, endTime, score }
    });
    res.status(201).json(newStudySession);
  } catch (error) {
    next(error);
  }
});

// PUT update study session
router.put("/studySessions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { endTime, score } = req.body;
    const updatedStudySession = await prisma.studySession.update({
      where: { id },
      data: { endTime, score }
    });
    res.json(updatedStudySession);
  } catch (error) {
    next(error);
  }
});

// DELETE study session
router.delete("/studySessions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.studySession.delete({ where: { id } });
    res.json({ message: "Study session deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;