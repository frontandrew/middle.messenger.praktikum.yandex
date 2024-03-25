type ValidatorParams = {
  value: string
  required: boolean
}

type ValidationState = {
  textError: string
  hasError: boolean
}

type Validators = Record<string, ({}: ValidatorParams) => ValidationState>

const requiredStatus = { hasError: true, textError: 'This field is required.' };

function password({ value, required = false }: ValidatorParams): ValidationState {
  if (!value && required) return requiredStatus;

  const MIN_LENGTH = 8;

  let message = '';
  let status = false;

  if (value.length < MIN_LENGTH) {
    message = message.concat(`Minimum of ${MIN_LENGTH} characters. `);
    status = true;
  }

  if (/\s/.test(value)) {
    message = message.concat('Without whitespases. ');
    status = true;
  }

  let atLeastCheckResult = '';

  if (!/[A-Z]/.test(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
    status = true;
  }
  if (!/\d/.test(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' digit,');
    status = true;
  }
  if (!/[!@#№$%^&?*()-_+={}[\]|/\\<>]/.test(value)) {
    atLeastCheckResult = atLeastCheckResult.concat(' special symbol.');
    status = true;
  }

  if (atLeastCheckResult.length > 0) {
    message = message.concat(
      'Must contain at least one more ',
      atLeastCheckResult,
    );
  }

  if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');

  // console.warn({ atLeastCheckResult, message, status, })
  return { hasError: status, textError: status ? message : '' };
}

function login({ value, required = false }: ValidatorParams): ValidationState {
  if (!value && required) return requiredStatus;

  const MIN_LENGTH = 3;
  const MAX_LENGTH = 20;

  let message = '';
  let status = false;

  if (value.length < MIN_LENGTH) {
    message = message.concat(`Minimum length is ${MIN_LENGTH} characters.`);
    status = true;
  }
  if (value.length > MAX_LENGTH) {
    message = message.concat(`Maximum length is ${MAX_LENGTH} characters.`);
    status = true;
  }

  return { hasError: status, textError: status ? message : '' };
}

export const validators: Validators = { login, password, username: login };
export type { ValidatorParams, ValidationState };
