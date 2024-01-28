import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

interface VerificationCodeProperties extends DefaultEmailProps {
  readonly code: string;
}

export class VerificationCodeTemplate extends EmailTemplate<VerificationCodeProperties> {
  constructor(data: VerificationCodeProperties) {
    super('verification-code', data);
  }

  subject(): string {
    return 'Votre inscription à EOVO';
  }

  text() {
    return `Validez votre e-mail pour continuer votre inscription
Utilisez le code de vérification ci-dessous pour valider votre e-mail et continuer votre inscription.
${this.data.code}
Ce code est valide 30 minutes.
Vous avez reçu cet e-mail parce que vous avez créer un compte sur EOVO. Si ce n'est pas le cas, ignorez cet e-mail.`;
  }
}
