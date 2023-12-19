import { v4 as uuidv4 } from 'uuid';

export enum Base {
  BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  BASE10 = '0123456789',
  ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
}

export class CodeGenerator {
  static generate(length: number, base: Base): string {
    const possible = base as string;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
  }

  static uuid(): string {
    return uuidv4();
  }
}
