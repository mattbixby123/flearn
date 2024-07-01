const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { prisma } = require("../db");

async function main() {
  // Create one user with a profile
  const passwordHash = await bcrypt.hash("hello", Number(process.env.SALT_ROUNDS));
  const user = await prisma.user.create({
    data: {
      username: "hello123",
      email: "hello@flearn.com",
      password: passwordHash,
      profile: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          avatar: faker.image.avatar(),
          bio: faker.lorem.sentence()
        }
      }
    }
  });

  console.log(`Created user with ID: ${user.id}`);

  // Create one deck for the user
  const deck = await prisma.deck.create({
    data: {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      userId: user.id,
    }
  });

  console.log(`Created deck with ID: ${deck.id}`);

  // Create 10 random cards and associate them with the deck
  const cards = await Promise.all(
    Array.from({ length: 10 }).map(() => prisma.card.create({
      data: {
        front: faker.lorem.sentence(),
        back: faker.lorem.sentence(),
        deckId: deck.id
      }
    }))
  );

  console.log(`Created 10 cards for deck with ID: ${deck.id}`);

  // Create one card list for the deck with all 10 cards
  const cardList = await prisma.cardList.create({
    data: {
      name: faker.lorem.words(2),
      userId: user.id,
      deckId: deck.id,
      cards: {
        connect: cards.map(card => ({
          id: card.id
        }))
      }
    }
  });

  console.log(`Created card list with ID: ${cardList.id} for deck with ID: ${deck.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = { main };
