/**
 * Prove that a value is an {@link Array}.
 * @param value - Value to check
 * @returns Proof that value is an {@link Array}
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Prove that a value is a {@link TemplateStringsArray}.
 * @param value - Value to check
 * @returns Proof that value is a {@link TemplateStringsArray}
 */
export function isTemplateStringsArray(
  value: unknown,
): value is TemplateStringsArray {
  return isArray(value) && Object.hasOwn(value, "raw")
}

/**
 * Generate a random integer between `min` and `max` (inclusive).
 * @param min Minimum value
 * @param max Maximum value
 * @returns A random integer between `min` and `max` (inclusive)
 * @internal
 */
export function randomInt(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Ensure that a string S includes another string N (needle).
 * @param n - string to include
 * @returns Function which, given a string, ensures that it includes `needle`
 * @internal
 */
export function including(n: string): (str: string) => string {
  return (s: string) => {
    if (s.includes(n)) return s
    const idx = randomInt(0, s.length - n.length)
    const prefix = s.substring(0, idx)
    const suffix = s.substring(n.length - idx, s.length)
    return prefix + n + suffix
  }
}
