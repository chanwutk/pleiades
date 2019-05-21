export function jsonCopy(obj: {}) {
  return JSON.parse(JSON.stringify(obj));
}