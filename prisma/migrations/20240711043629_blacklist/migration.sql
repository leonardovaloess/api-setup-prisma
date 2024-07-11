-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_token_key" ON "Blacklist"("token");
