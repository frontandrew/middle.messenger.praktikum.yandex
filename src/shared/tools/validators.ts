const requiredStatus = { hasError: true, textError: 'This field is required.' };

function password({ string, isRequred = false }) {
  if (!string && isRequred) return requiredStatus;

  const MIN_LENGTH = 8;

  let message = '';
  let status = false;

  if (string.length < MIN_LENGTH) {
    message = message.concat(`Minimum of ${MIN_LENGTH} characters. `);
    status = true;
  }

  if (/\s/.test(string)) {
    message = message.concat('Without whitespases. ');
    status = true;
  }

  let atLeastCheckResult = '';

  if (!/[A-Z]/.test(string)) {
    atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
    status = true;
  }
  if (!/\d/.test(string)) {
    atLeastCheckResult = atLeastCheckResult.concat(' digit,');
    status = true;
  }
  if (!/[!@#№$%^&?*()-_+={}[\]|/\\<>]/.test(string)) {
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

function login({ string, isRequred = false }) {
  if (!string && isRequred) return requiredStatus;

  const MIN_LENGTH = 3;
  const MAX_LENGTH = 20;

  let message = '';
  let status = false;

  if (string.length < MIN_LENGTH) {
    message = message.concat(`Minimum length is ${MIN_LENGTH} characters.`);
    status = true;
  }
  if (string.length > MAX_LENGTH) {
    message = message.concat(`Maximum length is ${MAX_LENGTH} characters.`);
    status = true;
  }

  return { hasError: status, textError: status ? message : '' };
}

export const validators = { password, login, username: login };
