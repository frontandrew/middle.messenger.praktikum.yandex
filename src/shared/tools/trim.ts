export function trim(input: string, chars?: string): string {
  if (typeof chars !== 'string') {
    return input.trim();
  }

  // const result = chars
  //   .split('')
  //   .reduce((res, char) => res.replace(RegExp(char, 'g'), ''), String(input));

  const result = ` ${input} `
    .replace(` ${chars}`, '')
    .replace(`${chars} `, '');

  return result.trim();
}
