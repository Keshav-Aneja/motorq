/*
  Warnings:

  - You are about to drop the column `end` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ALTER COLUMN "requestedTo" SET NOT NULL,
ALTER COLUMN "requestedTo" SET DATA TYPE TEXT;
