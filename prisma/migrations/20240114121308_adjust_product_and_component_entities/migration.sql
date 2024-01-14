/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restockLevel` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "restockLevel" INTEGER NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL;
