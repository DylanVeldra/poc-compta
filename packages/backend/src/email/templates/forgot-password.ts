import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';

interface ForgotPasswordProperties extends DefaultEmailProps {
  readonly token: string;
}

export class ForgotPasswordTemplate extends EmailTemplate<ForgotPasswordProperties> {
  constructor(data: ForgotPasswordProperties) {
    super('forgot-password', data);
  }

  subject(): string {
    return 'Mot de passe oublié';
  }

  text() {
    return `Le token ${this.data.token} !`;
  }
}
