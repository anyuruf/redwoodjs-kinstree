-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Member" (
    "id" CHAR(21) NOT NULL,
    "firstName" VARCHAR(48) NOT NULL,
    "lastName" VARCHAR(48) NOT NULL,
    "tribeClan" VARCHAR(96),
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),
    "description" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" CHAR(21) NOT NULL,
    "source" CHAR(21) NOT NULL,
    "target" CHAR(21) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
