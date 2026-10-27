/*
  Warnings:

  - Added the required column `no_inv` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "no_inv" TEXT NOT NULL;
