#UsingHTML <!-- ... -->

An HTML comment is used to add explanatory notes to the markup or to prevent the browser from interpreting specific parts of the document.

Comments start with the string `<!--` and end with the string `-->`, generally with text in between.

- Cannot start with `>` or `->`
- Cannot contain `-->` or `--!>`
- Cannot end with `<!-` (but `<!` is allowed)

The browser ignores comments when rendering the code. They are not visible on the page—only in the source code.

The same rules apply for XML (e.g. SVG, MathML), with the addition that comments cannot contain the sequence `--`.

---

## Usage

Comments can be single-line or multi-line.

They can be used:

- Before and after the Doctype
- Before and after the `<html>` element
- Inside most elements, except:
  - `<script>`
  - `<style>`
  - `<title>`
  - `<textarea>`

---

> **Note:**  
> `<script>` elements should not contain HTML comments. Use JavaScript comments instead.  
> Wrapping scripts in HTML comments was a legacy workaround for very old browsers and should not be used today.

---

## Syntax

```html
<!-- Comment -->
<html></html>
```
