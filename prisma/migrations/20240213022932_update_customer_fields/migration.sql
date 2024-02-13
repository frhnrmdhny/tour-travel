/*
  Warnings:

  - You are about to drop the column `age` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthplace` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_type` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatusId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_passport` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_vaccine` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupationId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passport_city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passport_issued_date` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passport_number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdistrict` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('TUAN', 'NONA', 'NYONYA');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('NIK', 'KITAS', 'KITAP', 'PASPOR');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "age",
DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "name",
ADD COLUMN     "birthdate" TEXT NOT NULL,
ADD COLUMN     "birthplace" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "educationId" TEXT NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "identity_number" TEXT NOT NULL,
ADD COLUMN     "identity_type" "IdentityType" NOT NULL,
ADD COLUMN     "maritalStatusId" TEXT NOT NULL,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "name_passport" TEXT NOT NULL,
ADD COLUMN     "name_vaccine" TEXT NOT NULL,
ADD COLUMN     "nationality" "Nationality" NOT NULL,
ADD COLUMN     "occupationId" TEXT NOT NULL,
ADD COLUMN     "passport_city" TEXT NOT NULL,
ADD COLUMN     "passport_issued_date" TEXT NOT NULL,
ADD COLUMN     "passport_number" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "subdistrict" TEXT NOT NULL,
ADD COLUMN     "title" "Title" NOT NULL,
ADD COLUMN     "ward" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MaritalStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MaritalStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_maritalStatusId_fkey" FOREIGN KEY ("maritalStatusId") REFERENCES "MaritalStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
