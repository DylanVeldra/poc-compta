import { PrismaModule } from '@prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailModule } from '@email/email.module';
import { UserController } from './user.controller';
import { UserEmailController } from './email.controller';
import { RegisterService } from './register.service';
import { AntiphishingController } from './antiphishing/antiphishing.controller';
import { AntiphishingService } from './antiphishing/antiphishing.service';
import { TwoFactorModule } from '@auth/2FA/2fa.module';
import { TagService } from './tags/tag.service';
import { TagController } from './tags/tag.controller';

@Module({
  imports: [PrismaModule, EmailModule, TwoFactorModule],
  providers: [UserService, RegisterService, AntiphishingService, TagService],
  controllers: [
    UserController,
    UserEmailController,
    AntiphishingController,
    TagController,
  ],
  exports: [UserService],
})
export class UserModule {}
