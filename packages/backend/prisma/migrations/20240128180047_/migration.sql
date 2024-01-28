-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('USER', 'COMPTA', 'ADMIN');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('REGISTRATION_IN_PROGRESS', 'ALLOWED', 'BANNED');

-- CreateEnum
CREATE TYPE "EMAIL_VERIFICATION_STATUS" AS ENUM ('ERROR', 'PENDING', 'VERIFIED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "INVOICE_STATUS" AS ENUM ('DRAFT', 'UNPAID', 'PAID', 'BAD_DEBT');

-- CreateEnum
CREATE TYPE "TRANSACTION_MODE" AS ENUM ('NORMAL', 'FEE', 'TRANSFER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "twoFactorSecret" TEXT,
    "twoFactorVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorRecoverHash" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "currentEmailVerificationId" INTEGER,
    "role" "USER_ROLE" NOT NULL DEFAULT 'USER',
    "optIn" BOOLEAN NOT NULL,
    "termsOfService" BOOLEAN NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "USER_STATUS" NOT NULL DEFAULT 'REGISTRATION_IN_PROGRESS',
    "antiPhishingCode" TEXT,
    "antiPhishingCodeExpiration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultCompany" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "status" "EMAIL_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "numberOfAttempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EmailVerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordVerificationRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "EMAIL_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PasswordVerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnUsers" (
    "tagId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnUsers_pkey" PRIMARY KEY ("tagId","userId")
);

-- CreateTable
CREATE TABLE "UsersOnCompanies" (
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnCompanies_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateTable
CREATE TABLE "InvoiceRow" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "pricePerUnit" INTEGER NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "INVOICE_STATUS" NOT NULL,
    "comptabilityId" INTEGER,
    "validatedAt" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "pdfDocumentUrl" TEXT,
    "companyId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicesOnTransactions" (
    "invoiceId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" INTEGER NOT NULL,

    CONSTRAINT "InvoicesOnTransactions_pkey" PRIMARY KEY ("invoiceId","transactionId")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externalBankDataProviderId" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "registryId" TEXT NOT NULL,
    "vatId" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externalId" TEXT NOT NULL,
    "externalCreatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "madeOn" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "isCrypto" BOOLEAN NOT NULL,
    "mode" "TRANSACTION_MODE" NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "bankId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externalId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerCode" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseJustification" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "deductibleVAT" INTEGER NOT NULL,

    CONSTRAINT "ExpenseJustification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseDocument" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expenseJustificationId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isCompany" BOOLEAN NOT NULL,
    "vatId" TEXT,
    "registryId" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_currentEmailVerificationId_key" ON "User"("currentEmailVerificationId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordVerificationRequest_token_key" ON "PasswordVerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_externalId_key" ON "Transaction"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_externalId_key" ON "BankAccount"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_externalId_key" ON "Bank"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToTransaction_AB_unique" ON "_InvoiceToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToTransaction_B_index" ON "_InvoiceToTransaction"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentEmailVerificationId_fkey" FOREIGN KEY ("currentEmailVerificationId") REFERENCES "EmailVerificationCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordVerificationRequest" ADD CONSTRAINT "PasswordVerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnUsers" ADD CONSTRAINT "TagsOnUsers_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnUsers" ADD CONSTRAINT "TagsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCompanies" ADD CONSTRAINT "UsersOnCompanies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCompanies" ADD CONSTRAINT "UsersOnCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRow" ADD CONSTRAINT "InvoiceRow_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesOnTransactions" ADD CONSTRAINT "InvoicesOnTransactions_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesOnTransactions" ADD CONSTRAINT "InvoicesOnTransactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseJustification" ADD CONSTRAINT "ExpenseJustification_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDocument" ADD CONSTRAINT "ExpenseDocument_expenseJustificationId_fkey" FOREIGN KEY ("expenseJustificationId") REFERENCES "ExpenseJustification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToTransaction" ADD CONSTRAINT "_InvoiceToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToTransaction" ADD CONSTRAINT "_InvoiceToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
