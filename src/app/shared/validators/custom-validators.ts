import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notZeroValidator(control: AbstractControl): ValidationErrors | null {
  return control.value !== 0 ? null : { notZero: true };
}

export function decimalWithDotValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const decimalRegex = /^\d+(\.\d+)?$/;
  return decimalRegex.test(value) ? null : { invalidDecimal: true };
}

export function materialDateInvalidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      return control.hasError('matDatepickerParse') ? { matStartDateInvalid: true } : null;
  };
}