import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidCryptoHash' })
@Injectable()
export class CryptoHashRule implements ValidatorConstraintInterface {
  private checkHash(hash: string): boolean {
    const regex = /^[0-9a-fA-F]{1,}$/;
    return regex.test(hash);
  }

  validate(value: string) {
    return this.checkHash(value.startsWith('0x') ? value.substring(2) : value);
  }

  defaultMessage() {
    return `Isn't crypto hash`;
  }
}

export function IsValidCryptoHash(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidCryptoHash',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CryptoHashRule,
    });
  };
}
