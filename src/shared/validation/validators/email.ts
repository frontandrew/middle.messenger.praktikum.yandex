import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function email({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(value.match(/^[\da-z_.-]+@[a-z]+\.[a-z]{2,}$/i))) {
    message = message.concat(' Incorrect email format.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '', value };
}
