// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { countries } from 'countries-list';

// @ValidatorConstraint({ name: 'IsValidCountry' })
// @Injectable()
// export class CountryRule implements ValidatorConstraintInterface {
//   validate(value: string) {
//     return !!Object.keys(countries).find((key) => key === value);
//   }

//   defaultMessage() {
//     return `Country must be a valid country (ISO 3166-1 alpha-2)`;
//   }
// }

// export function IsValidCountry(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: 'IsValidCountry',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: CountryRule,
//     });
//   };
// }
