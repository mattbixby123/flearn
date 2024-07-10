const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


// Register a new user account
router.post("/register", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,
        profile: {
          create: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
            bio: req.body.bio
          }
        }
      }
    });
    
    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.status(201).send ({ token })

  } catch (error) {
    next(error);
  }
});

// Login to an exisiting user account
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).send("invalid login credentials")
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordMatch) {
      // const token = jwt.sign({ id: user.id }, process.env.JWT);
      const token = jwt.sign({ id: user.id }, process.env.JWT);
      res.send({ token })
    }
    else {
      return res.status(401).send("plaintext password provided does NOT match the hashed password saved in db")
    }
  } catch (error) {
    next(error);
  }
})

// Get the currently loggin in user
router.get("/me", async (req, res, next) => {
  try {
    let user;

    // Check if user is authenticated
    if (req.user) {
      user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          profile: true,
        }
      });
      console.log('user - ', user)
      res.send(user);
    } else {
      res.status(401).send('User not authenticated');
    }

  } catch (error) {
    next(error);
  }
});



module.exports = router;