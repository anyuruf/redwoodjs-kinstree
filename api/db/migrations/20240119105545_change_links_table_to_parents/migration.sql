/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "Parent" (
    "id" CHAR(21) NOT NULL,
    "source" CHAR(21) NOT NULL,
    "target" CHAR(21) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);
