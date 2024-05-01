import { hasNumbers, hasSpaces, hasSpecials } from '../tools';
import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function name({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(/^[A-ZА-ЯЁ]{1}[a-zа-яё]+((-[A-ZА-ЯЁ]{1})?[a-zа-яё]+)?$/.test(value))) {
    message = message.concat(` Incorrect format.`);
    status = true;
  }

  let atLeastCheckResult = '';
  if (hasSpaces(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' spases,');
    status = true;
  }
  if (hasNumbers(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' numbers,');
    status = true;
  }
  if (hasSpecials(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' special symbol,');
    status = true;
  }
  if (atLeastCheckResult.length > 0) {
    message = message.concat(`Cant contain ${atLeastCheckResult}`);
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '', value };
}
