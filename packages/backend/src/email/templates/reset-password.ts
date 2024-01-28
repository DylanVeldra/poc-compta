import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

interface ForgotPasswordProperties extends DefaultEmailProps {
  readonly url: string;
}

export class ForgotPasswordTemplate extends EmailTemplate<ForgotPasswordProperties> {
  constructor(data: ForgotPasswordProperties) {
    super('reset-password', data);
  }

  subject(): string {
    return 'Réinitialisation de votre mot de passe';
  }

  text() {
    return `Réinitialisation de votre mot de passe
Vous avez demandé à réinitialiser votre mot de passe. Il vous suffit de cliquer sur le lien ci-dessous :
Je crée un nouveau mot de passe ${this.data.url}
Ce lien restera actif 1h après réception
Si vous n'êtes pas à l'origine de cette demande vous pouvez ignorer cet e-mail.
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
