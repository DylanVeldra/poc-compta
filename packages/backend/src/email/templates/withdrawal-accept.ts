import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface WithdrawalAcceptParams extends DefaultEmailProps {
  readonly date: DateTime;
  readonly amount: number;
}
interface WithdrawalAcceptProperties extends DefaultEmailProps {
  readonly day: string;
  readonly hour: string;
  readonly amount: number;
}

export class WithdrawalAcceptTemplate extends EmailTemplate<WithdrawalAcceptProperties> {
  constructor(data: WithdrawalAcceptParams) {
    super('withdrawal-accept', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
      hour: data.date.toFormat('HH:mm'),
      amount: data.amount / 100,
    });
  }

  subject(): string {
    return 'Votre retrait a bien été accepté !';
  }

  text() {
    return `Suite à votre demande du ${this.data.day}, la somme de ${
      this.data.amount / 100
    }$ vient d’être débitée de votre compte EOVO et virée sur l’adresse communiqué lors de la demande.`;
  }
}
