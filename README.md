# Safe

Safe is a Deno module which produces safe strings out of any input string.

## Usage

```ts
import { safe } from "https://deno.land/x/safe/mod.ts"

// use as a regular function or a template tag.
// both print: "Welcome to \u65e5\u672c!"
console.log(safe("Welcome to 日本!"))
console.log(safe`Welcome to 日本!`)
```

`s` is an alias for `safe`, use it if you like:

```ts
import { s } from "https://deno.land/x/safe/mod.ts"
console.log(s("Welcome to 日本!"))
console.log(s`"Welcome to 日本!"`)
```

## What is "safe"?

`safe` is a function which, given a string, returns a "safe string"
representation of the input. The idea is that you should be able to print a safe
string in any terminal/shell/console without worrying about bells ringing, lines
being deleted, screen flashing/clearing, etc.

You also don't _lose_ any information in the process. The safe string
technically contains the same information as the original string, but not
necessarily byte-for-byte.

## How does it work?

"Normal" ASCII characters, meaning any characters with a code point in the range
32–126, starting with space `" "` and ending with tilde `"~"`, are returned
as-is.

Any other character is returned as an escape sequence, e.g. `\x1b` for `ESC`,
`\u{01f404}` for 🐄, etc.

However, the following code points get special treatment:

- `\\0`, not `\x00` (NUL) – null character
- `\\b`, not `\x08` (BS) – backspace
- `\\t`, not `\x09` (HT) – horizontal tab
- `\\n`, not `\x0A` (LF) – line feed
- `\\v`, not `\x0B` (VT) – vertical tab
- `\\f`, not `\x0C` (FF) – form feed
- `\\r`, not `\x0D` (CR) – carriage return

## Details

Escape sequences in the output will always be zero-padded to two, four, or six
digits, depending on the code point. Other than that, safe strings always
contain their shortest escaped representation.

The main reasons are a) readability, and b) consistency. For example `\x7` is
NOT valid JavaScript syntax, it is always `\x07`. Same goes for `\u404`, it must
be `\u0404`. However, `\u{1f404}` IS valid, and the same thing as `\u{01f404}`.

Escape sequences are always completely in lowercase, e.g. `\uabcd`, not
`\uABCD`.

We COULD have done `\u{7}`, but it's longer than `\x07`, and not as easily
recognizable, as usually when we see `\u`, we think of a Unicode code point, not
regular old ASCII.

### Normalization

Normalization is NOT performed on the input string. Normalizing it would
essentially corrupt the original representation, and you would lose information.

If this is a concern for some reason, run `.normalize()` on the input string
before passing it to Safe.

## Development

Contributions are welcome! Please open an issue or a pull request.

```console
$ deno fmt && deno lint && deno test
```

### Release a new version

- [ ] Run `deno task pre-commit`
- [ ] Check that documentation is still correct
- [ ] Update CHANGELOG.md
  - [ ] Add a new version section
  - [ ] Add link reference at the bottom
- [ ] Tag the commit with `vX.Y.Z` - WITH the `v`
- [ ] Commit with message `Release X.Y.Z` - NOT `vX.Y.Z`
