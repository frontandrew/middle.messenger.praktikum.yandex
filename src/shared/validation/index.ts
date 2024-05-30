import { chatTitle } from './validators/chat-title';
import { email } from './validators/email';
import { file } from './validators/file';
import { isRequired } from './validators/is-required';
import { login } from './validators/login';
import { name } from './validators/name';
import { password } from './validators/password';
import { phone } from './validators/phone';

import type { ValidationState, ValidatorParams, Validators } from './type';

export type { ValidatorParams, ValidationState, Validators };

export const validators: Validators = {
  login,
  password,
  password_more: password,
  newPassword: password,
  oldPassword: password,
  name,
  first_name: name,
  second_name: name,
  file,
  avatar: file,
  email,
  phone,
  chatTitle,
  isRequired,
};
