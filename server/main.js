require('dotenv').config() //load env variables
const express = require('express');
const morgan = require('morgan');
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const path = require('path')


app.use(express.json());
app.use(morgan('dev'));

// Import body-parser middleware for parsing JSON request bodies
const bodyParser = require('body-parser')
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
// Static file-serving middleware / only needed for deployment
app.use(express.static(path.join(__dirname, "..", "client/dist")));

// express-paginate middleware
app.all(function(req, res, next) {
  // set default or minimum is 10 (as it was prior to v0.2.0)
  if (req.query.limit <= 10) req.query.limit = 10;
  next();
});

// Check requests for a token and attach the decoded id to the request                                                                                            
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try {
    req.customer = jwt.verify(token, process.env.JWT);
  } catch {
    req.customer = null;
  }

  next();
});

// Backend routes
// app.use("/api", require("./api"));
app.use("/auth", require("./auth"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ... <3`);
});