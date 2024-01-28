import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

interface ResetPasswordProperties extends DefaultEmailProps {
  readonly url: string;
}

export class ResetPasswordTemplate extends EmailTemplate<ResetPasswordProperties> {
  constructor(data: ResetPasswordProperties) {
    super('reset-password-confirmed', data);
  }

  subject(): string {
    return 'Confirmation de changement de mot de passe';
  }

  text() {
    return `Votre mot de passe a bien été réinitialisé
Votre changement de mot de passe a bien été enregistré. Vous pouvez de nouveau vous connecter à votre espace EOVO en toute sécurité.
Je me connecte ${this.data.url}
Pour toute question, n'hésitez pas à contacter le support.`;
  }
}
