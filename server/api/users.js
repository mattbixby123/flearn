const router = require("express").Router();
const { prisma } = require("../db");

// GET users - Retrieve a list of all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userProfile: true,
      }
    });
    res.json(users);
  } catch (error) {
      next (error);
  }
});

// GET /users/:id - Retrieve a specific user by ID
router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const user = await prisma.user.findUnique({
       where: { id: parseInt(id) },
     });
     if (!user) {
       return res.status(404).json({ error: "User not found" });
     }
     res.json(user);
  } catch (error) {
     next (error);
  }
});

// POST /users - Create a new user
router.post("/users", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password, // Note: In a real-world scenario, you should hash the password before saving
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id - Update a specific user by ID
router.put("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        username: username !== undefined ? username : existingUser.username,
        email: email !== undefined ? email : existingUser.email,
        password: password !== undefined ? password : existingUser.password,
        // Note: In a real-world scenario, you should hash the password before saving
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id - Delete a specific user by ID
router.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    res.json({ deletedUser: deletedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;