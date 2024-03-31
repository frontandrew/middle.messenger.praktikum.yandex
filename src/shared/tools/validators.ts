type ValidatorParams = {
  value: string
  required: boolean
}

type ValidationState = {
  textError: string
  hasError: boolean
}

type Validators = Record<string, ({}: ValidatorParams) => ValidationState>

function password({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_PASS_LENGTH = 8;

  let { textError: message, hasError: status } = isRequired({ value, required });

  if (value.length < MIN_PASS_LENGTH) {
    message = message.concat(` Minimum of ${MIN_PASS_LENGTH} characters.`);
    status = true;
  }
  if (hasWitespaces(value)) {
    message = message.concat(' Cant contain spases.');
    status = true;
  }

  let atLeastCheckResult = ' Must contain at least one more';

  if (!hasCapitalLetters(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
    status = true;
  }
  if (!hasSpetialCharacter(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' special symbol,');
    status = true;
  }
  if (!hasNumbers(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' digit.');
    status = true;
  }
  if (atLeastCheckResult.length > 0) {
    message = message.concat(
      // ' Must contain at least one more',
      atLeastCheckResult,
    );
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  return { hasError: status, textError: status ? message : '' };
}

function login({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_LOGIN_LENGTH = 3;
  const MAX_LOGIN_LENGTH = 20;

  let { textError: message, hasError: status } = isRequired({ value, required });

  if (hasWitespaces(value)) {
    message = message.concat(' Cant contain spases.');
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

  return { hasError: status, textError: status ? message.trim() : '' };
}

function email({ value = '', required = false }: ValidatorParams): ValidationState {
  let { textError: message, hasError: status } = isRequired({ value, required });

  if (!(value.match(/^[\da-z_.-]+@[a-z]+.[a-z]{2,}$/i))) {
    message = message.concat(' Incorrect email format.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '' };
}

function phone({ value = '', required = false }: ValidatorParams): ValidationState {
  const MIN_PHONE_LENGTH = 11;

  let { textError: message, hasError: status } = isRequired({ value, required });

  const lengthMatcher = (value).match(/\d/g);

  if (!value.match(/^\+?\s?(\d{1,16}\s?)?(\d{1,4}\s?){1,6}$/)) {
    message = message.concat(' Incorrect phone format.');
    status = true;
  }

  if (!Array.isArray(lengthMatcher) || (lengthMatcher.length < MIN_PHONE_LENGTH)) {
    message = message.concat(' Not enough numbers.');
    status = true;
  }

  return { hasError: status, textError: status ? message.trim() : '' };
}

function isRequired({ value = '', required = false }: ValidatorParams): ValidationState {
  const requiredStatus = { hasError: true, textError: 'This field is required.' };

  if (!value && required) return requiredStatus;
  return { hasError: false, textError: '' };
}

export const validators: Validators = {
  login, password, password_more: password, email, phone, isRequired,
};

export type { ValidatorParams, ValidationState };

/* VALID FUNCTION */

function hasSpetialCharacter(value: string): boolean {
  return /[`~!:;@#№$%^&?*()\-_+={}[\]|/\\<>,.]/.test(value);
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
