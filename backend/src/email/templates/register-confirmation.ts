import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface RegisterConfirmationProperties extends DefaultEmailProps {
  readonly day: string;
  readonly hour: string;
}

interface RegisterConfirmationParams extends DefaultEmailProps {
  readonly date: DateTime;
}

export class RegisterConfirmationTemplate extends EmailTemplate<RegisterConfirmationProperties> {
  constructor(data: RegisterConfirmationParams) {
    super('register-confirmation', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
      hour: data.date.toFormat('HH:mm'),
    });
  }

  subject(): string {
    return 'Votre inscription en attente de validation';
  }

  text() {
    return `Nous avons bien reçu votre demande d'inscription
Votre demande d'inscription du ${this.data.day} à ${this.data.hour} a bien été prise en compte. Celle ci va être traitée par l'administrateur dans les meilleurs délais.
Vous recevrez très prochainement une confirmation par email dès que votre demande aura été traitée.
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
