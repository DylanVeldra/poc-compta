import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidBirthDate' })
@Injectable()
export class BirthDateRule implements ValidatorConstraintInterface {
  validate(value: string) {
    return new Date(value).getTime() < new Date().getTime();
  }

  defaultMessage() {
    return `Birthday must be in the past`;
  }
}

export function IsValidBirthDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidBirthDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BirthDateRule,
    });
  };
}
