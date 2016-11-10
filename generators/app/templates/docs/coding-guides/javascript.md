# JavaScript coding guide

As a general rule, it is a good idea to get inspiration from the community-approved 
[AngularJS style guide](https://github.com/johnpapa/angular-styleguide).

This starter kit architecture and base template tries to comply with most of the rules described there.

## Naming convention

- Use `camelCase` everywhere (properties and methods), except for:
  * Class names and constructors which should use `PascalCase`
  * Constants should be all in UPPERCASE, like `var MY_CONSTANT = 0;`
- File names should always be in `kebab-case`

## Coding rules

- Use single quotes `'` for strings
- Dependency injection order: start with the most generic (framework, external libs) to the most specific (project
  modules)
- Use 1 line per dependency inject/import, to ease merges and improve readability
- Use the `_` prefix for internal variable names
- Only expose properties / methods publicly when it's needed, do not put everything in the `$scope`
- Never put anything in the global scope
- Always use strict equality checks: `===` and `!==` instead of `==` or `!=` to avoid comparison pitfalls (see 
  [JavaScript equality table](https://dorey.github.io/JavaScript-Equality-Table/))
- Use `[]` instead of `Array`
