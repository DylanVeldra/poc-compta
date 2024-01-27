import emailConfig from '@config/email.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
// import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { EmailInputDto } from './dto/email.input';
import { EmailGeneratorService } from '@email-generator/email-generator';
import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

@Injectable()
export class EmailService {
  // private _sesClient: SESv2Client;

  constructor(
    @Inject(emailConfig.KEY)
    private config: ConfigType<typeof emailConfig>,
    private emailGenerator: EmailGeneratorService,
  ) {
    // this._sesClient = new SESv2Client({
    //   credentials: {
    //     accessKeyId: config.accessKeyId!,
    //     secretAccessKey: config.secretAccessKey!,
    //   },
    //   region: config.region,
    // });
  }

  sendTemplatedEmail<T extends DefaultEmailProps>(
    destinationEmail: string,
    template: EmailTemplate<T>,
  ) {
    const emailParams = this.emailGenerator.generate(
      template,
      destinationEmail,
    );
    // return this._sesClient.send(new SendEmailCommand(emailParams));
  }

  sendEmail(email: EmailInputDto) {
    // const command = new SendEmailCommand({
    //   Destination: {
    //     ToAddresses: [email.to],
    //   },
    //   FromEmailAddress: this.config.defaultSender,
    //   Content: {
    //     Simple: {
    //       Subject: {
    //         Data: email.subject,
    //       },
    //       Body: {
    //         Text: {
    //           Data: email.text,
    //         },
    //         Html: {
    //           Data: email.html,
    //         },
    //       },
    //     },
    //   },
    // });
    // return this._sesClient.send(command);
  }
}
