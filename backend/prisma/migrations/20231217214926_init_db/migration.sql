-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'COMPTA', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('REGISTRATION_IN_PROGRESS', 'ALLOWED', 'BANNED');

-- CreateEnum
CREATE TYPE "EmailVerificationStatus" AS ENUM ('ERROR', 'PENDING', 'VERIFIED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'UNPAID', 'PAID', 'BAD_DEBT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
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
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "optIn" BOOLEAN NOT NULL,
    "termsOfService" BOOLEAN NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "UserStatus" NOT NULL DEFAULT 'REGISTRATION_IN_PROGRESS',
    "antiPhishingCode" TEXT,
    "antiPhishingCodeExpiration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "status" "EmailVerificationStatus" NOT NULL DEFAULT 'PENDING',
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "EmailVerificationStatus" NOT NULL DEFAULT 'PENDING',

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
CREATE TABLE "InvoiceRow" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "pricePerUnit" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "pdfDocumentUUID" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentEmailVerificationId_fkey" FOREIGN KEY ("currentEmailVerificationId") REFERENCES "EmailVerificationCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordVerificationRequest" ADD CONSTRAINT "PasswordVerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnUsers" ADD CONSTRAINT "TagsOnUsers_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnUsers" ADD CONSTRAINT "TagsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceRow" ADD CONSTRAINT "InvoiceRow_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
