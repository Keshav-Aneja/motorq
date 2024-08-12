-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "assignedAssignments" TEXT[] DEFAULT ARRAY[]::TEXT[];
