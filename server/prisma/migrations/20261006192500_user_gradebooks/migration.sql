-- CreateTable
CREATE TABLE "UserGradebook" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "programKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGradebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGradebook_userId_programKey_key" ON "UserGradebook"("userId", "programKey");

-- CreateIndex
CREATE INDEX "UserGradebook_programKey_idx" ON "UserGradebook"("programKey");

-- AddForeignKey
ALTER TABLE "UserGradebook" ADD CONSTRAINT "UserGradebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
