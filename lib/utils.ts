/**
 * Prove that a value is an {@link Array}.
 * @param value A value to check
 * @returns Whether the value is an {@link Array}
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Prove that a value is a {@link TemplateStringsArray}.
 * @param value A value to check
 * @returns Proof that value is a {@link TemplateStringsArray}
 */
export function isTemplateStringsArray(
  value: unknown,
): value is TemplateStringsArray {
  return isArray(value) && Object.hasOwn(value, "raw")
}