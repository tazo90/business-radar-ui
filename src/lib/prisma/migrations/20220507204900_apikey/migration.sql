/*
  Warnings:

  - You are about to drop the column `token` on the `application_consumer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiKey]` on the table `application_consumer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiKey` to the `application_consumer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "application_consumer_token_key";

-- AlterTable
ALTER TABLE "application_consumer" DROP COLUMN "token",
ADD COLUMN     "apiKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "application_consumer_apiKey_key" ON "application_consumer"("apiKey");
