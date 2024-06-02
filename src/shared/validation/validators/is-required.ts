import { ValidationState, ValidatorParams } from '../type';

export function isRequired({ value = '', required = false }: ValidatorParams): ValidationState {
  const requiredStatus = { hasError: true, textError: 'This field is required.', value };

  if (!value && required) return requiredStatus;
  return { hasError: false, textError: '', value };
}
