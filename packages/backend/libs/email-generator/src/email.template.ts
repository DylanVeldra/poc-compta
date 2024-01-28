import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

export class DefaultEmailProps {
  readonly mediaUrl: string;
  readonly antiPhishingCode: string;
}
export abstract class EmailTemplate<T extends DefaultEmailProps> {
  protected hbTemplate: Handlebars.TemplateDelegate<T>;

  constructor(protected templateName: string, protected data: T) {
    const file = path.join(__dirname, 'emails', `${this.templateName}.html`);
    const content = fs.readFileSync(file, 'utf8');
    this.hbTemplate = Handlebars.compile(content);
  }

  html(): string {
    return this.hbTemplate(this.data);
  }

  abstract text(): string;

  abstract subject(): string;

  header(): string {
    return `EOVO`;
  }

  footer(): string {
    return `Votre code anti-hameçonnage est le suivant : ${this.data.antiPhishingCode}.
Pensez à vérifier s'il correspond bien à celui communiqué sur votre compte dans l'onglet Profil.
Mentions légales`;
  }
}
