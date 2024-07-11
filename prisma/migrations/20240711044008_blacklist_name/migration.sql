/*
  Warnings:

  - You are about to drop the `Blacklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Blacklist";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "blacklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "blacklist_token_key" ON "blacklist"("token");
