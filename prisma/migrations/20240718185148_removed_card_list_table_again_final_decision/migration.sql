/*
  Warnings:

  - You are about to drop the `_cardTocardList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cardList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_cardTocardList" DROP CONSTRAINT "_cardTocardList_A_fkey";

-- DropForeignKey
ALTER TABLE "_cardTocardList" DROP CONSTRAINT "_cardTocardList_B_fkey";

-- DropForeignKey
ALTER TABLE "cardList" DROP CONSTRAINT "cardList_deckId_fkey";

-- DropForeignKey
ALTER TABLE "cardList" DROP CONSTRAINT "cardList_userId_fkey";

-- DropTable
DROP TABLE "_cardTocardList";

-- DropTable
DROP TABLE "cardList";
