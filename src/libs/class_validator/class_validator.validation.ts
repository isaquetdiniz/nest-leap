import { InvalidDataFormatException } from '@/core/application';
import { validateSync, ValidationError } from 'class-validator';

export class ClassValidator {
  static validate(value: any): void {
    const errors = validateSync(value, {
      forbidNonWhitelisted: true,
      whitelist: true,
    });

    if (errors.length) {
      throw new InvalidDataFormatException(
        errors.map((err: ValidationError) => JSON.stringify(err.constraints)),
      );
    }
  }
}
