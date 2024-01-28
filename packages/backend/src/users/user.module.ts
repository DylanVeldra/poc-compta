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
import { ConfigModule } from '@nestjs/config';
import authConfig from '@config/auth.config';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    TwoFactorModule,
    ConfigModule.forRoot({
      load: [authConfig],
    }),
  ],
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
