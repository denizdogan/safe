// deno-lint-ignore-file prefer-ascii
import { asserts, fc } from "../deps.ts"
import { s, safe } from "./safe.ts"
const { assertEquals } = asserts

Deno.test("s is identical to safe", () => {
  assertEquals(safe, s)
})

Deno.test("safe does not throw errors for any utf-16", () => {
  fc.assert(
    fc.property(
      fc.stringOf(fc.char16bits(), { minLength: 0, maxLength: 1000 }),
      fc.stringOf(fc.char16bits(), { minLength: 1000, maxLength: 10000 }),
      (short, long) => {
        safe`${short}`
        safe`${long}`
      },
    ),
  )
})

Deno.test("input string is NOT normalized", () => {
  assertEquals(safe("\u212b"), "\\u212b")
})

Deno.test(
  "safe seems to work nicely with some examples",
  () => {
    assertEquals(safe("\0"), "\\0")
    assertEquals(safe("\n"), "\\n")
    assertEquals(safe("that's on you!"), "that's on you!")
    assertEquals(safe("Hello, world!"), "Hello, world!")
    assertEquals(safe("pendeltååååg"), "pendelt\\xe5\\xe5\\xe5\\xe5g")
    assertEquals(safe("Welcome to 日本!"), "Welcome to \\u65e5\\u672c!")
    assertEquals(safe("ily 😍 so much"), "ily \\u{01f60d} so much")
  },
)
