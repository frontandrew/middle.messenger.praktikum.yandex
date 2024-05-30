import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function chatTitle({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  const MIN_PASS_LENGTH = 5;

  if (value.length < MIN_PASS_LENGTH) {
    message = message.concat(` Minimum of ${MIN_PASS_LENGTH} characters.`);
    status = true;
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '', value };
}
