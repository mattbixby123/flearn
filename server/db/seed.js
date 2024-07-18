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

  // Create 5 random tags
  const tags = await Promise.all(
    Array.from({ length: 5 }).map(() => prisma.tag.create({
      data: {
        name: faker.lorem.word(),
      }
    }))
  );

  console.log(`Created 5 tags`);

  // Create one deck for the user and associate it with some tags
  const deck = await prisma.deck.create({
    data: {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      userId: user.id,
      tags: {
        connect: tags.slice(0, 3).map(tag => ({ id: tag.id })) // Associate with first 3 tags
      }
    }
  });

  console.log(`Created deck with ID: ${deck.id}`);

  // Create 10 random cards, associate them with the deck and some tags
  const cards = await Promise.all(
    Array.from({ length: 10 }).map(() => prisma.card.create({
      data: {
        front: faker.lorem.sentence(),
        back: faker.lorem.sentence(),
        deckId: deck.id,
        tags: {
          connect: tags.slice(0, 2).map(tag => ({ id: tag.id })) // Associate each card with first 2 tags
        }
      }
    }))
  );

  console.log(`Created 10 cards for deck with ID: ${deck.id}`);
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
