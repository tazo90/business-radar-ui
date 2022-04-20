/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_projectId_fkey";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "organizationId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
