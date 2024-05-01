export function hasSpecials(value: string): boolean {
  return /[`~!:;@#№$%^&?*()+={}[\]|/\\<>,.]/.test(value);
}
