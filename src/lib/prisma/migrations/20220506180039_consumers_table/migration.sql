/*
  Warnings:

  - You are about to drop the column `description` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `component` table. All the data in the column will be lost.
  - You are about to drop the `_ApplicationToBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApplicationToCountry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumerId` to the `component` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationConsumerStatus" AS ENUM ('active', 'draft', 'closed');

-- DropForeignKey
ALTER TABLE "_ApplicationToBrand" DROP CONSTRAINT "_ApplicationToBrand_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToBrand" DROP CONSTRAINT "_ApplicationToBrand_B_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToCountry" DROP CONSTRAINT "_ApplicationToCountry_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToCountry" DROP CONSTRAINT "_ApplicationToCountry_B_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_projectId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_userId_fkey";

-- DropForeignKey
ALTER TABLE "component" DROP CONSTRAINT "component_applicationId_fkey";

-- DropIndex
DROP INDEX "application_token_key";

-- DropIndex
DROP INDEX "application_uid_key";

-- AlterTable
ALTER TABLE "application" DROP COLUMN "description",
DROP COLUMN "domain",
DROP COLUMN "expires",
DROP COLUMN "projectId",
DROP COLUMN "status",
DROP COLUMN "title",
DROP COLUMN "token",
DROP COLUMN "uid",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "component" DROP COLUMN "applicationId",
ADD COLUMN     "consumerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ApplicationToBrand";

-- DropTable
DROP TABLE "_ApplicationToCountry";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "application_consumer" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "ApplicationConsumerStatus" NOT NULL DEFAULT E'draft',
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "application_consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApplicationConsumerToBrand" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ApplicationConsumerToCountry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "application_consumer_uid_key" ON "application_consumer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "application_consumer_token_key" ON "application_consumer"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationConsumerToBrand_AB_unique" ON "_ApplicationConsumerToBrand"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationConsumerToBrand_B_index" ON "_ApplicationConsumerToBrand"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationConsumerToCountry_AB_unique" ON "_ApplicationConsumerToCountry"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationConsumerToCountry_B_index" ON "_ApplicationConsumerToCountry"("B");

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_consumer" ADD CONSTRAINT "application_consumer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_consumer" ADD CONSTRAINT "application_consumer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_consumer" ADD CONSTRAINT "application_consumer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "application_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationConsumerToBrand" ADD FOREIGN KEY ("A") REFERENCES "application_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationConsumerToBrand" ADD FOREIGN KEY ("B") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationConsumerToCountry" ADD FOREIGN KEY ("A") REFERENCES "application_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationConsumerToCountry" ADD FOREIGN KEY ("B") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
