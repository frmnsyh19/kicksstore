/*
  Warnings:

  - You are about to drop the column `profile_id` on the `Checkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "profile_id",
ADD COLUMN     "kecamatan" TEXT,
ADD COLUMN     "phone" TEXT;
