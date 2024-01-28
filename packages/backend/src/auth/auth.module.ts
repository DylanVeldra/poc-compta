import { UserModule } from '@users/user.module';
import authConfig from '@config/auth.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwoFactorModule } from './2FA/2fa.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailVerificationController } from './email/email.controller';
import { EmailModule } from '@email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    UserModule,
    TwoFactorModule,
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController, EmailVerificationController],
})
export class AuthModule {}
