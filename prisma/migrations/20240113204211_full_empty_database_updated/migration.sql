/*
  Warnings:

  - You are about to drop the column `email` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `nivelDorPosInsercao` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `email`,
    DROP COLUMN `nivelDorPosInsercao`,
    ADD COLUMN `dataInsercao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
