import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface DepositAcceptedProperties extends DefaultEmailProps {
  readonly day: string;
  readonly amount: number;
  readonly currency: string;
}

interface DepositAcceptedParams extends DefaultEmailProps {
  readonly day: DateTime;
  readonly amount: number;
  readonly currency: string;
}

export class DepositAcceptedTemplate extends EmailTemplate<DepositAcceptedProperties> {
  constructor(data: DepositAcceptedParams) {
    super('deposit-accepted', {
      ...data,
      day: data.day.toFormat('DD/MM/YYYY'),
      amount: data.amount / 100,
    });
  }

  subject(): string {
    return 'Confirmation de dépôt';
  }

  text() {
    return `Votre dépôt a bien été accepté !
Suite à votre demande du ${this.data.day}, la somme de ${this.data.amount}${this.data.currency} vient d'être créditée sur votre compte EOVO. Ce dépôt sera ajouté à votre capital dès ce soir à minuit.
Accéder à mon tableau de bord
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
