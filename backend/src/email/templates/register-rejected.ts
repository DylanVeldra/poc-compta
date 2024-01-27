import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface RegistrationRejectedProperties extends DefaultEmailProps {
  readonly day: string;
}

interface RegistrationRejectedParams extends DefaultEmailProps {
  readonly date: DateTime;
}

export class RegistrationRejectedTemplate extends EmailTemplate<RegistrationRejectedProperties> {
  constructor(data: RegistrationRejectedParams) {
    super('register-rejected', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
    });
  }

  subject(): string {
    return "Refus de votre demande d'inscription";
  }

  text() {
    return `Votre inscription a été refusée
Suite à votre inscription du ${this.data.day}, nous vous avons le regret de vous informer que votre compte a bien été refusé par l'administrateur.
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
