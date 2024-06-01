export function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
