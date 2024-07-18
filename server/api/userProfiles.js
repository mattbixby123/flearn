const router = require("express").Router();
const { prisma } = require("../db");

// GET /userProfiles - Get all userProfiles
router.get("/", async (req, res, next) => {
  try {
    const userProfiles = await prisma.userProfile.findMany();
    res.json(userProfiles);
  } catch (error) {
    next(error);
  }
});

// GET /userProfiles/:id - Get a specific userProfile by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userProfile = await prisma.userProfile.findUnique({
      where: { id: id },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    next(error);
  }
});

// POST /userProfiles - Create a new userProfile
router.post("/userProfiles", async (req, res, next) => {
  try {
    const { userId, firstName, lastName, avatar, bio } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if profile already exists for this user
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: userId },
    });

    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    const newProfile = await prisma.userProfile.create({
      data: {
        userId,
        firstName,
        lastName,
        avatar,
        bio,
      },
    });

    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
});

// PUT /userProfiles/:id - Update a specific userProfile by ID
router.put("/userProfiles/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, avatar, bio } = req.body;

    const existingProfile = await prisma.userProfile.findUnique({
      where: { id: id },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { id: id },
      data: {
        firstName: firstName !== undefined ? firstName : existingProfile.firstName,
        lastName: lastName !== undefined ? lastName : existingProfile.lastName,
        avatar: avatar !== undefined ? avatar : existingProfile.avatar,
        bio: bio !== undefined ? bio : existingProfile.bio,
      },
    });

    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
});

// DELETE /userProfiles/:id - Delete a specific userProfile by ID
router.delete("/userProfiles/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProfile = await prisma.userProfile.delete({
      where: { id: id },
    });
    res.json({ deletedProfile: deletedProfile });
  } catch (error) {
    next(error);
  }
});


module.exports = router;