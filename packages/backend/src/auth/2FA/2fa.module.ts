import authConfig from '@config/auth.config';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@users/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwoFactorController } from './2fa.controller';
import { TwoFactorService } from './2fa.service';
import { EmailModule } from '@email/email.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    forwardRef(() => UserModule),
    ConfigModule.forRoot({
      load: [authConfig],
    }),
  ],
  providers: [TwoFactorService],
  controllers: [TwoFactorController],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
