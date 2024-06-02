import { hasSpaces, hasSpecials } from '../tools';
import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function login({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_LOGIN_LENGTH = 3;
  const MAX_LOGIN_LENGTH = 20;

  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(/\D/.test(value))) {
    message = message.concat(' Cant contain only numbers.');
    status = true;
  }
  if (hasSpaces(value)) {
    message = message.concat(' Cant contain spases.');
    status = true;
  }
  if (hasSpecials(value)) {
    message = message.concat(' Cant contain spetial simbols.');
    status = true;
  }
  if (value.length < MIN_LOGIN_LENGTH) {
    message = message.concat(` Minimum length is ${MIN_LOGIN_LENGTH} characters.`);
    status = true;
  }
  if (value.length > MAX_LOGIN_LENGTH) {
    message = message.concat(` Maximum length is ${MAX_LOGIN_LENGTH} characters.`);
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '', value };
}
