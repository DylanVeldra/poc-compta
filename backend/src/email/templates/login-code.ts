import {
  DefaultEmailProps,
  EmailTemplate,
} from '@email-generator/email-generator/email.template';
import { DateTime } from 'luxon';

interface LoginCodeParams extends DefaultEmailProps {
  readonly code: string;
  readonly email: string;
  readonly device: string;
  readonly ip: string;
}

interface LoginCodeProperties extends DefaultEmailProps {
  readonly code: string;
  readonly day: string;
  readonly hour: string;
  readonly timezone: string;
  readonly email: string;
  readonly device: string;
  readonly ip: string;
}

export class LoginCodeTemplate extends EmailTemplate<LoginCodeProperties> {
  constructor(data: LoginCodeParams) {
    const date = DateTime.now();
    super('login-code', {
      ...data,
      day: date.toFormat('DD/MM/YYYY'),
      hour: date.toFormat('HH:mm'),
      timezone: date.toFormat('Z'),
    });
  }

  subject(): string {
    return 'Nouvelle connexion à EOVO';
  }

  text() {
    return `Connexion à EOVO
Utilisez le code de vérification ci-dessous pour vous connecter à votre compte EOVO.
${this.data.code}
Ce code est valide 30 minutes.
Pour renforcer la sécurité de votre compte EOVO, un code de vérification est demandé pour toute connexion.
Date et heure : ${this.data.day} à ${this.data.hour} (${this.data.timezone})
IP : ${this.data.ip}
Appareil : ${this.data.device}
Si vous n'êtes pas à l'origine de cette connexion, veuillez modifier votre mot de passe et contacter le support.`;
  }
}
