import { SafeParams } from "./types.ts"
import { isTemplateStringsArray } from "./utils.ts"

const UNKNOWN_CODE_POINT_STRING = "?"

/**
 * Safely escape unsafe characters in a string.
 * @param str Input string
 * @returns A string with unsafe characters replaced by escape sequences.
 */
function safened(str: string): string {
  const rx = /[^\x20-\x7E]/gu
  const repl = (m: string) => {
    switch (m) {
      case "\0":
        return "\\0"
      case "\b":
        return "\\b"
      case "\t":
        return "\\t"
      case "\n":
        return "\\n"
      case "\v":
        return "\\v"
      case "\f":
        return "\\f"
      case "\r":
        return "\\r"
      default: {
        const cp = m.codePointAt(0)
        if (cp === undefined) {
          return UNKNOWN_CODE_POINT_STRING
        } else if (cp <= 0xFF) {
          return `\\x${cp.toString(16).padStart(2, "0")}`
        } else if (cp <= 0xFFFF) {
          return `\\u${cp.toString(16).padStart(4, "0")}`
        } else if (cp <= 0x10FFFF) {
          return `\\u{${cp.toString(16).padStart(6, "0")}}`
        } else {
          return UNKNOWN_CODE_POINT_STRING
        }
      }
    }
  }
  return str.replaceAll(rx, repl)
}

/**
 * Get a safe representation of a string.
 * @param str - Potentially unsafe string
 * @returns Safe representation of `str`
 */
export function safe(...[first, ...rest]: SafeParams): string {
  if (isTemplateStringsArray(first)) {
    const text = String.raw({ raw: first }, ...rest)
    return safened(text)
  } else {
    const text = first
    return safened(text)
  }
}

export const s = safe
