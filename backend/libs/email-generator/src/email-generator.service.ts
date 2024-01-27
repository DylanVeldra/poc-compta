import { Inject, Injectable } from '@nestjs/common';
import { DefaultEmailProps, EmailTemplate } from './email.template';
// import { SendEmailCommandInput } from '@aws-sdk/client-sesv2';
import emailConfig from '@config/email.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailGeneratorService {
  constructor(
    @Inject(emailConfig.KEY)
    private config: ConfigType<typeof emailConfig>,
  ) {}

  // todo replace any
  generate<T extends DefaultEmailProps>(
    template: EmailTemplate<T>,
    destinationEmail: string,
  ): any {
    const text = `${template.header()}\n${template.text()}\n${template.footer()}`;
    return {
      Destination: {
        ToAddresses: [destinationEmail],
      },
      FromEmailAddress: this.config.defaultSender,
      Content: {
        Simple: {
          Subject: {
            Data: template.subject(),
          },
          Body: {
            Text: {
              Data: text,
            },
            Html: {
              Data: template.html(),
            },
          },
        },
      },
    };
  }
}
