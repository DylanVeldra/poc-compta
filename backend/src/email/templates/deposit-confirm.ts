import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface DepositConfirmProperties extends DefaultEmailProps {
  readonly day: string;
  readonly hour: string;
}

interface DepositConfirmParams extends DefaultEmailProps {
  readonly date: DateTime;
}

export class DepositConfirmTemplate extends EmailTemplate<DepositConfirmProperties> {
  constructor(data: DepositConfirmParams) {
    super('deposit-confirm', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
      hour: data.date.toFormat('HH:mm'),
    });
  }

  subject(): string {
    return 'Votre notification de dépôt en attente de validation';
  }

  text() {
    return `Nous avons bien reçu votre notification de dépôt
Votre demande de dépôt du ${this.data.day} à ${this.data.hour} a bien été prise en compte. Celle ci va être traitée par l'administrateur dans les meilleurs délais.
Vous recevrez très prochainement une confirmation par email dès que votre demande aura été traitée.
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
