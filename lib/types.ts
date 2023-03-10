/**
 * Parameters of {@link safe} when used as an ordinary function.
 */
export type AsFunction = [str: string]

/**
 * Parameters of {@link safe} when used as a template tag function.
 */
export type AsTemplateTag = [
  strings: TemplateStringsArray,
  ...values: unknown[],
]

/**
 * Parameters that {@link safe} accepts.
 */
export type SafeParams = AsFunction | AsTemplateTag
