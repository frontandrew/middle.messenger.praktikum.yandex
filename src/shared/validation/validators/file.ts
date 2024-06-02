import { isRequired } from './is-required';

import type { ValidationState, ValidatorParams } from '../type';

export function file({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(/^.*\.(jpg|jpeg|png|svg|gif|mpeg|mpg4|mkv|avi|webp)$/i).test(value)) {
    message = message.concat(' File type isnt acceptable.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '', value };
}
