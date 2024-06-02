import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function phone({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_PHONE_LENGTH = 10;
  const MAX_PHONE_LENGTH = 15;

  let { textError: message, hasError: status } = isRequired({ value, required });

  const lengthMatcher = (value).match(/\d/g);

  if (!value.match(/^\+?\s?([\d\s])*$/)) {
    message = message.concat(' Incorrect phone format.');
    status = true;
  }

  if (!Array.isArray(lengthMatcher) || (lengthMatcher.length < MIN_PHONE_LENGTH)) {
    message = message.concat(' There are not enough numbers.');
    status = true;
  }

  if (!Array.isArray(lengthMatcher) || (lengthMatcher.length > MAX_PHONE_LENGTH)) {
    message = message.concat(' There are too many numbers.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '', value };
}
