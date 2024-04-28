type ValidatorParams = {
  value: string,
  required?: boolean,
}

type ValidationState = {
  textError: string,
  hasError: boolean,
  value: string,
}

type Validators = Record<string, ({}: ValidatorParams) => ValidationState>

function name({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(/^[A-ZА-ЯЁ]{1}[a-zа-яё]+((-[A-ZА-ЯЁ]{1})?[a-zа-яё]+)?$/.test(value))) {
    message = message.concat(` Incorrect format.`);
    status = true;
  }

  let atLeastCheckResult = '';
  if (hasWitespaces(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' spases,');
    status = true;
  }
  if (hasNumbers(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' numbers,');
    status = true;
  }
  if (hasSpetialCharacter(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' special symbol,');
    status = true;
  }
  if (atLeastCheckResult.length > 0) {
    message = message.concat(`Cant contain ${atLeastCheckResult}`);
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '', value };
}

function password({ value = '', required = false }: ValidatorParams): ValidationState {
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
  if (hasWitespaces(value)) {
    message = message.concat(' Cant contain spases.');
    status = true;
  }

  let atLeastCheckResult = '';
  if (!hasCapitalLetters(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
    status = true;
  }
  /** TODO: изначально планировалось требовать хотябы один спецсимвол */
  // if (!hasSpetialCharacter(value)) {
  //   atLeastCheckResult = atLeastCheckResult.concat(' special symbol,');
  //   status = true;
  // }
  if (!hasNumbers(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' digit.');
    status = true;
  }
  if (atLeastCheckResult.length > 0) {
    message = message.concat(`Must contain at least one more ${atLeastCheckResult}`);
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '', value };
}

function login({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_LOGIN_LENGTH = 3;
  const MAX_LOGIN_LENGTH = 20;

  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(/\D/.test(value))) {
    message = message.concat(' Cant contain only numbers.');
    status = true;
  }
  if (hasWitespaces(value)) {
    message = message.concat(' Cant contain spases.');
    status = true;
  }
  if (hasSpetialCharacter(value)) {
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

function email({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(value.match(/^[\da-z_.-]+@[a-z]+\.[a-z]{2,}$/i))) {
    message = message.concat(' Incorrect email format.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '', value };
}

function phone({ value = '', required = false }: ValidatorParams): ValidationState {
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

function isRequired({ value = '', required = false }: ValidatorParams): ValidationState {
  const requiredStatus = { hasError: true, textError: 'This field is required.', value };

  if (!value && required) return requiredStatus;
  return { hasError: false, textError: '', value };
}

export const validators: Validators = {
  login,
  password,
  password_more: password,
  password_new: password,
  name,
  first_name: name,
  second_name: name,
  email,
  phone,
  isRequired,
};

export type { ValidatorParams, ValidationState };

/* VALID FUNCTION */

function hasSpetialCharacter(value: string): boolean {
  return /[`~!:;@#№$%^&?*()+={}[\]|/\\<>,.]/.test(value);
}

function hasWitespaces(value: string): boolean {
  return /\s/.test(value);
}

function hasCapitalLetters(value: string): boolean {
  return /[A-Z]/.test(value);
}

function hasNumbers(value: string): boolean {
  return /\d/.test(value);
}
