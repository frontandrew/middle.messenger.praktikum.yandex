import { hasCapitals, hasNumbers, hasSpaces } from '../tools';
import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function password({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_PASS_LENGTH = 8;
  const MAX_PASS_LENGTH = 40;

  let { textError: message, hasError: status } = isRequired({ value, required });

  if (value.length < MIN_PASS_LENGTH) {
    message = message.concat(` Minimum of ${MIN_PASS_LENGTH} characters.`);
    status = true;
  }
  if (value.length > MAX_PASS_LENGTH) {
    message = message.concat(` Maximum of ${MAX_PASS_LENGTH} characters.`);
    status = true;
  }
  if (hasSpaces(value)) {
    message = message.concat(' Cant contain spases.');
    status = true;
  }

  let atLeastCheckResult = '';
  if (!hasCapitals(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
    status = true;
  }
  /** TODO: изначально планировалось требовать хотябы один спецсимвол */
  // if (!hasSpecials(value)) {
  //   atLeastCheckResult = atLeastCheckResult.concat(' special symbol,');
  //   status = true;
  // }
  if (!hasNumbers(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' number.');
    status = true;
  }
  if (atLeastCheckResult.length > 0) {
    message = message.concat(`Must contain at least one more ${atLeastCheckResult}`);
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '', value };
}
