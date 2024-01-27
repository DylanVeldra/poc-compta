import emailConfig from '@config/email.config';
import { EmailGeneratorService } from '@email-generator/email-generator';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
    }),
  ],
  providers: [EmailService, EmailGeneratorService],
  exports: [EmailService],
})
export class EmailModule {}
