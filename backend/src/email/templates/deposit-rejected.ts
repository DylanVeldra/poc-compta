import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface DepositRejectedProperties extends DefaultEmailProps {
  readonly day: string;
  readonly reason: string;
}

interface DepositRejectedParams extends DefaultEmailProps {
  readonly day: DateTime;
  readonly reason: string;
}

export class DepositRejectedTemplate extends EmailTemplate<DepositRejectedProperties> {
  constructor(data: DepositRejectedParams) {
    super('deposit-rejected', {
      ...data,
      day: data.day.toFormat('DD/MM/YYYY'),
    });
  }

  subject(): string {
    return 'Refus de votre demande de dépôt';
  }

  text() {
    let text = `Votre dépôt a été refusé
Votre demande de dépôt du ${this.data.day} vient d'être refusé par l'administrateur pour la raison suivante :
• ${this.data.reason}
Vous pouvez dès à présent demander un nouveau dépôt sur votre compte EOVO.
Demander un dépôt
Pour toute question concernant ce refus, n'hésitez pas à contacter le support.`;
    return text;
  }
}
