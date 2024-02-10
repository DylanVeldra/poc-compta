/*
  Warnings:

  - You are about to drop the column `amount` on the `InvoiceRow` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `InvoiceRow` table. All the data in the column will be lost.
  - Added the required column `accountBankId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `InvoiceRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `InvoiceRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `InvoiceRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "accountBankId" INTEGER NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceRow" DROP COLUMN "amount",
DROP COLUMN "vat",
ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
