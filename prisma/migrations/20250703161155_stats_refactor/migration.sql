/*
  Warnings:

  - You are about to alter the column `unitPrice` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `cost` on the `MaintenanceCost` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `stats` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[statsId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `severity` on the `MaintenanceCost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `statsId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Training` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('U10', 'U12', 'U14', 'U16', 'U18', 'U20', 'N1B', 'N1A', 'VETERAN', 'SENIOR');

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "MaintenanceCost" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "severity",
ADD COLUMN     "severity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "stats",
ADD COLUMN     "statsId" INTEGER NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" SERIAL NOT NULL,
    "shoot" INTEGER NOT NULL,
    "dribble" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "finish" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "jump" INTEGER NOT NULL,
    "iq" INTEGER NOT NULL,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_statsId_key" ON "Player"("statsId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "PlayerStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
