import { asserts, fc } from "../deps.ts"
import { including } from "./utils.ts"
const { assertEquals } = asserts

Deno.test("`including` includes the given char", () => {
  fc.assert(
    fc.property(
      fc.char16bits(),
      fc.stringOf(fc.char16bits(), { minLength: 0, maxLength: 1000 }),
      (char, str) => including(char)(str).includes(char),
    ),
  )
})

Deno.test("`including` works with empty string", () => {
  including("")
})

Deno.test("`including` works with ascii", () => {
  for (const c of "abcdefghijklmnopqrstuvwxyz") {
    including(c)
  }
})

Deno.test("`including` works when given 2-byte utf-8 char", () => {
  including("\u00e4")
})

Deno.test("`including` works when given 3-byte utf-8 char", () => {
  including("\u65e5")
})

Deno.test("`including` works when given 4-byte utf-8 char", () => {
  including("\u{01f404}")
})

Deno.test(`including("")("") returns ""`, () => {
  assertEquals("", including("")(""))
})

Deno.test(`including("needle")("") returns "needle"`, () => {
  assertEquals("needle", including("needle")(""))
})

Deno.test(`including("")("needle") returns "needle"`, () => {
  assertEquals("needle", including("")("needle"))
})

Deno.test(`including("nee")("def") returns "nee"`, () => {
  assertEquals("nee", including("nee")("def"))
})

Deno.test(`including("longneedle")("def") returns "longneedle"`, () => {
  assertEquals("longneedle", including("longneedle")("def"))
})
