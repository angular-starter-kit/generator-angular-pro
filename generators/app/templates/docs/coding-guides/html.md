# HTML coding guide

## Naming conventions

- Everything should be named in `kebab-case` (lowercase words separated with a `-`): tags, attributes, IDs, etc
- Do not use the `data-` prefix for angular directives, and feel free to add your own custom elements (yes, it will
  not be compliant to the W3C validator for now)
- File names should always be in `kebab-case`

## Coding rules

- Use HTML5 doctype: `<!doctype html>`
- Use HTML semantics according to its purpose
- Use double quotes `"` around attribute values in tags
- Use a new line for every block, list, or table element, and indent every such child element
- Clearly Separate structure (HTML) from presentation (CSS) from behavior (JavaScript):
  * Never use inline CSS or JavaScript
  * Keep controller logic out of the HTML
- `type` attribute for stylesheets and script tags should be omitted
- Use valid HTML where possible

## Pitfalls

- **Block**-type tags cannot be nested inside **inline**-type tags: a `<div>` tag cannot be nested in a `<span>`
- HTML is **not** XML: empty tags cannot be self-closing and will result in improper results
  * `<div/>` will be interpreted as a simple `<div>` without closing tag!
  * The only tags that allows self-closing are the one that does not require a closing tag in first place:
    these are the void elements that do not not accept content `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`
    (and others).
