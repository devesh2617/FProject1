/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRole_role_key" ON "UserRole"("role");
