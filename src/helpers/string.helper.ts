/**
 * Replaces in a string mustache keys by their values from an object {key1 : value1, key2: value2...}
 *
 * @param str The string containig mustaches
 * @param data the keys/values object
 * @returns The string filled with correct values
 */
export function mustache(str: string, data = {}): string {
  return Object.entries<string>(data)
    .reduce(
      (res, [key, valueToReplace]) => res.replace(
        new RegExp(`{s*${key}s*}`, 'g'),
        valueToReplace
      ),
      str
    );
}

/**
 * Concatenates two paths removing first path's ending slash and second path's starting slash (if presents)
 *
 * @param p1 First path to concatenate
 * @param p2 Second path to concatenate
 * @returns the concatenated path
 */
export function concatMustachePaths(p1: string, p2: string): string {
  const p1Poped = p1.endsWith('/') ? p1.slice(0, p1.length - 1) : p1;
  const p2Shifted = p2.startsWith('/') ? p2.slice(1) : p2;
  return `${p1Poped}/{parentId}/${p2Shifted}`;
}
