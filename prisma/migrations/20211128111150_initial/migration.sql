-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('alive', 'dead');

-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "showId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CharacterStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Death" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "when" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Death_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Show_slug_key" ON "Show"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Show_tmdbId_key" ON "Show"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_tmdbId_key" ON "Actor"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_tmdbId_key" ON "Character"("tmdbId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Death" ADD CONSTRAINT "Death_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
