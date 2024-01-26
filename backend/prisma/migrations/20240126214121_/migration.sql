/*
  Warnings:

  - You are about to alter the column `balance` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `type` on the `ExpenseDocument` table. All the data in the column will be lost.
  - You are about to alter the column `deductibleVAT` on the `ExpenseJustification` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `pdfDocumentUUID` on the `Invoice` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `InvoiceRow` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `pricePerUnit` on the `InvoiceRow` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `expenseJustificationId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `contentType` to the `ExpenseDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_expenseJustificationId_fkey";

-- AlterTable
ALTER TABLE "Bank" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ExpenseDocument" DROP COLUMN "type",
ADD COLUMN     "contentType" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ExpenseJustification" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "deductibleVAT" SET DATA TYPE INTEGER;
DROP SEQUENCE "ExpenseJustification_id_seq";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "pdfDocumentUUID",
ADD COLUMN     "comptabilityId" INTEGER,
ADD COLUMN     "pdfDocumentUrl" TEXT,
ADD COLUMN     "validatedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "InvoiceRow" ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "pricePerUnit" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "PasswordVerificationRequest" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "expenseJustificationId",
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "InvoicesOnTransactions" (
    "invoiceId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" INTEGER NOT NULL,

    CONSTRAINT "InvoicesOnTransactions_pkey" PRIMARY KEY ("invoiceId","transactionId")
);

-- CreateTable
CREATE TABLE "_InvoiceToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToTransaction_AB_unique" ON "_InvoiceToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToTransaction_B_index" ON "_InvoiceToTransaction"("B");

-- AddForeignKey
ALTER TABLE "InvoicesOnTransactions" ADD CONSTRAINT "InvoicesOnTransactions_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesOnTransactions" ADD CONSTRAINT "InvoicesOnTransactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseJustification" ADD CONSTRAINT "ExpenseJustification_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToTransaction" ADD CONSTRAINT "_InvoiceToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToTransaction" ADD CONSTRAINT "_InvoiceToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
