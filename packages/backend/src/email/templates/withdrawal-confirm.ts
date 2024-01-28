import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface WithdrawalConfirmParams extends DefaultEmailProps {
  readonly date: DateTime;
}
interface WithdrawalConfirmProperties extends DefaultEmailProps {
  readonly day: string;
  readonly hour: string;
}

export class WithdrawalConfirmTemplate extends EmailTemplate<WithdrawalConfirmProperties> {
  constructor(data: WithdrawalConfirmParams) {
    super('withdrawal-confirm', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
      hour: data.date.toFormat('HH:mm'),
    });
  }

  subject(): string {
    return 'Votre demande de retrait en attente de validation';
  }

  text() {
    return `Nous avons bien reçu votre demande de retrait
Votre demande de retrait du ${this.data.day} à ${this.data.hour} a bien été prise en compte. Celle ci va être traitée par l'administrateur dans les meilleurs délais.
Vous recevrez très prochainement une confirmation par email dès que votre demande aura été traitée.
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
