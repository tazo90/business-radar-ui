/*
  Warnings:

  - Added the required column `type` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('stores', 'jobs', 'ecommerce', 'trainings');

-- AlterTable
ALTER TABLE "application" ADD COLUMN     "type" "ApplicationType" NOT NULL;
