# CSS coding guide

## Naming conventions

- In the CSS world, everything should be named in `kebab-case` (lowercase words separated with a `-`).
- File names should always be in `kebab-case`

## Coding rules

- When using CSS preprocessors such as Less/Sass, this nesting hierarchy should be used:
  ```less
  // The base component class acts as the namespace, to avoid naming and style collisions
  .my-component {
    // Put here all component elements (flat)
    .my-element {
      // Use a third-level only for modifiers and state variations
      &.active { ... }
    }
  }
  ```
  Yes, we are aware of the [BEM naming approach](https://en.bem.info/tools/bem/bem-naming/), but we found it
  impractical for large projects. The nesting approach has drawbacks such as increased specificity, but it helps
  keeping everything nicely organized, and more importantly, *scoped*.
  
- Use single quotes `'` for strings

And keep in mind this general rules:
- Always use classes selectors, never use ID or element selectors
- No more than **3 levels** of nesting
- No more than **3 qualifiers**

## Best practices

- Use object-oriented CSS (OOCSS):
  * Factorize common code in base class, and extend it, for example:
  ```scss
  // Base button class
  .btn { ... }
  
  // Color variation
  .btn-warning { ... }
  
  // Size variation
  .btn-small { ... }
  ```
  * Try to name class by semantic, not style nor function for better reusability:
    Use `.btn-warning`, not `btn-orange` nor `btn-cancel`
  * Avoid undoing style, refactor using common base classes and extensions

- Keep your style scoped
  * Clearly separate **global** (think *framework*) and **modules** (*components*) style
  * Global style should only go in `main/theme/*` or `main/helpers.scss` (never in modules)
  * Avoid interactions between modules, if some style may need to be shared, refactor it as a framework component in
    put it in your global theme.
  * Avoid using wider selectors than needed (always use classes!)
  
- Avoid rules multiplication
  * The less, the better (no pun intented), factorize rules whenever it's possible
  * CSS is code, and like any code frequent refactoring is healthy
  
- When ugly hacks cannot be avoided, put it in `main/hacks.scss`:
  * These ugly hacks should only be **temporary**
  * Each hack should be documented with the author name, the problem and hack reason
  * Limit this file to a reasonable length (~100 lines) and refactor hacks with proper solutions when the limit is 
    reached.

## Pitfalls

- Never use the `!important` keyword. Ever.
- Never use **inline** style in html, even *just for debugging* (because we KNOW it will end up in your commit)
- Do not use browser-specific prefixes: there are tools taking care of that part 
  ([autoprefixer](https://github.com/postcss/autoprefixer))

