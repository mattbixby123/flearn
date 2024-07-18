-- CreateTable
CREATE TABLE "cardList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cardList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_cardTocardList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cardTocardList_AB_unique" ON "_cardTocardList"("A", "B");

-- CreateIndex
CREATE INDEX "_cardTocardList_B_index" ON "_cardTocardList"("B");

-- AddForeignKey
ALTER TABLE "cardList" ADD CONSTRAINT "cardList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardList" ADD CONSTRAINT "cardList_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cardTocardList" ADD CONSTRAINT "_cardTocardList_A_fkey" FOREIGN KEY ("A") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cardTocardList" ADD CONSTRAINT "_cardTocardList_B_fkey" FOREIGN KEY ("B") REFERENCES "cardList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
