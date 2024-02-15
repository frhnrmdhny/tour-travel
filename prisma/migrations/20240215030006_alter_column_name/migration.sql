/*
  Warnings:

  - You are about to drop the column `father_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `identity_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `identity_type` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name_passport` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name_vaccine` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `passport_city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `passport_issued_date` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `passport_number` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `fatherName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityType` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namePassport` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameVaccine` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportCity` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportIssuedDate` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "father_name",
DROP COLUMN "identity_number",
DROP COLUMN "identity_type",
DROP COLUMN "name_passport",
DROP COLUMN "name_vaccine",
DROP COLUMN "passport_city",
DROP COLUMN "passport_issued_date",
DROP COLUMN "passport_number",
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "identityNumber" TEXT NOT NULL,
ADD COLUMN     "identityType" "IdentityType" NOT NULL,
ADD COLUMN     "namePassport" TEXT NOT NULL,
ADD COLUMN     "nameVaccine" TEXT NOT NULL,
ADD COLUMN     "passportCity" TEXT NOT NULL,
ADD COLUMN     "passportIssuedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "passportNumber" TEXT NOT NULL;
