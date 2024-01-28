import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface WithdrawalRejectParams extends DefaultEmailProps {
  readonly date: DateTime;
  readonly refuseMotive: string;
}
interface WithdrawalRejectProperties extends DefaultEmailProps {
  readonly day: string;
  readonly hour: string;
  readonly refuseMotive: string;
}

export class WithdrawalRejectTemplate extends EmailTemplate<WithdrawalRejectProperties> {
  constructor(data: WithdrawalRejectParams) {
    super('withdrawal-reject', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
      hour: data.date.toFormat('HH:mm'),
    });
  }

  subject(): string {
    return 'Votre retrait a été refusé';
  }

  text() {
    return `Votre demande de retrait ${this.data.day} vient d’être refusée par l’administrateur pour la raison suivante :
 
${this.data.refuseMotive}

N’hésitez pas à contacter le support EOVO pour plus d’informations sur ce refus.`;
  }
}
