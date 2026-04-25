import {
  registerDecorator,
  // type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

export function StartsWith<T>(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: T) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage() {
          return `Название должно начинаться с "${prefix}"`;
        },
      },
    });
  };
}
