const express = require('express');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Add your routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});