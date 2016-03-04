# TypeScript coding guide

[TypeScript](http://www.typescriptlang.org) is a superset of JavaScript, therefore most
[JavaScript conventions and good practices](javascript.md) also applies here. Exceptions or changes to these rules
are noted in this file.

## Naming conventions

- Use `PascalCase` for type names and enum values
- Do not use `_` as a prefix for private properties

## Coding rules

- Do not export types/functions unless you need to share it across multiple components
- Do not introduce new types/values to the global namespace
- Use arrow functions over anonymous function expressions
- Only surround arrow function parameters when necessary. 
  For example, `(x) => x + x` is wrong but the following are correct:
  * `x => x + x`
  * `(x,y) => x + y`
  * `<T>(x: T, y: T) => x === y`

## Definitions

In order to infer types from JavaScript, the TypeScript language supports external type definitions. They are located
in the `typings` folder.

To automatically download or update typings for your bower dependencies, use the `gulp tsd` command. Note that removed
dependencies will not be removed automatically, you need to removed them manually. This is by design, so you can add
custom typings if needed in the `typings` folder.

If you want to further manage your types definitions, you can use the [TSD](https://github.com/Definitelytyped/tsd)
tool.

## Enforcement

As with JavaScript, coding rules are enforced in this project, via [TSLint](https://github.com/palantir/tslint).
