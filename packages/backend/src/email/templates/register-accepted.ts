import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface RegistrationAcceptedProperties extends DefaultEmailProps {
  readonly day: string;
}

interface RegistrationAcceptedParams extends DefaultEmailProps {
  readonly date: DateTime;
}

export class RegistrationAcceptedTemplate extends EmailTemplate<RegistrationAcceptedProperties> {
  constructor(data: RegistrationAcceptedParams) {
    super('register-accepted', {
      ...data,
      day: data.date.toFormat('DD/MM/YYYY'),
    });
  }

  subject(): string {
    return 'Bienvenue chez EOVO !';
  }

  text() {
    return `Votre compte EOVO a bien été validé !
Suite à votre inscription du ${this.data.day}, nous vous confirmons que votre compte a bien été validé par l'administrateur.
Vous pouvez dès à présent accéder à votre compte en utilisant l'email et le mot de passe renseigné lors de votre inscription et notifier votre premier dépôt.
Accéder à mon tableau de bord
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
