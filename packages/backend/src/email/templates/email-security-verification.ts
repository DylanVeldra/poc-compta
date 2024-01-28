import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

interface EmailSecurityVericationProperties extends DefaultEmailProps {
  readonly code: string;
}

export class EmailSecurityVerificationTemplate extends EmailTemplate<EmailSecurityVericationProperties> {
  constructor(data: EmailSecurityVericationProperties) {
    super('email-security-verification', data);
  }

  subject(): string {
    return 'Finaliser votre démarche';
  }

  text() {
    return `Vérification de sécurité
Vous venez d’effectuer une démarche sur EOVO. Utilisez le code ci-dessous pour valider votre identité et sécuriser votre compte 
${this.data.code}
Ce code est valide 30 minutes.
Vous avez reçu cet e-mail parce que vous avez créer un compte sur EOVO. Si ce n'est pas le cas, ignorez cet e-mail.`;
  }
}
