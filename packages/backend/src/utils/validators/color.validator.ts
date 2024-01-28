import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ColorHex' })
@Injectable()
export class ColorRule implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return /^#[0-9a-f]{6}$/i.test(value);
  }

  defaultMessage() {
    return `The color must be a valid hexadecimal color`;
  }
}

export function ColorHex(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ColorHex',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ColorRule,
    });
  };
}
