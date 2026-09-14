# Node.js — Episode 04: Modules, `require()` and `module.exports`

> Large Node.js applications should not keep everything in one file. Modules let us split code into smaller, reusable and maintainable pieces.

---

## 📚 Table of Contents

1. [What is a Module?](#1-what-is-a-module)
2. [CommonJS: `require()` and `module.exports`](#2-commonjs-require-and-moduleexports)
3. [Exporting One Value](#3-exporting-one-value)
4. [Exporting Multiple Values](#4-exporting-multiple-values)
5. [Importing Multiple Exports](#5-importing-multiple-exports)
6. [What `require()` Actually Gives You](#6-what-require-actually-gives-you)
7. [`module.exports` vs `exports`](#7-moduleexports-vs-exports)
8. [Nested Modules and `index.js`](#8-nested-modules-and-indexjs)
9. [Importing JSON and Built-in Modules](#9-importing-json-and-built-in-modules)
10. [CommonJS vs ES Modules](#10-commonjs-vs-es-modules)
11. [Strict Mode](#11-strict-mode)

---

# 1. What is a Module?

A **module** is a separate unit of code that can be organized and reused independently.

For example:

```text
project/
│
├── app.js
├── user.js
├── auth.js
└── utils.js
```

Each file can contain its own variables and functions.

In Node.js, a module can be a **single file or a folder containing related functionality**.

### Why use modules?

Without modules:

```text
app.js
 ├── authentication
 ├── database
 ├── payments
 ├── users
 ├── products
 └── hundreds of functions...
```

With modules:

```text
app.js
 │
 ├── auth.js
 ├── users.js
 ├── products.js
 └── payments.js
```

This improves:

- **Readability**
- **Maintainability**
- **Reusability**
- **Scalability**

Node.js treats each CommonJS file as a separate module, with its own module scope. citeturn0search0

---

# 2. CommonJS: `require()` and `module.exports`

Node.js supports multiple module systems. The original Node.js module system is **CommonJS (CJS)**.

The two most important CommonJS concepts are:

```javascript
module.exports;
```

and

```javascript
require();
```

Think of them as:

```text
Module A
   │
   │ module.exports
   ▼
Export something
   │
   ▼
Module B
   │
   │ require()
   ▼
Use the exported value
```

---

# 3. Exporting One Value

Suppose we have:

### `greet.js`

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

module.exports = greet;
```

Here, the function is being exported.

### `app.js`

```javascript
const greet = require("./greet");

console.log(greet("World"));
```

Output:

```text
Hello, World!
```

### Remember

```javascript
module.exports = greet;
```

means:

> "Make `greet` the value available to another module."

And:

```javascript
require("./greet");
```

means:

> "Load the value exported by `greet.js`."

Node.js's CommonJS `require()` returns the exported module content.

---

# 4. Exporting Multiple Values

You can export multiple functions or variables by exporting an object.

### `utils.js`

```javascript
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract,
};
```

### `app.js`

```javascript
const utils = require("./utils");

console.log(utils.add(5, 3));
console.log(utils.subtract(5, 3));
```

Output:

```text
8
2
```

---

# 5. Importing Multiple Exports

Instead of writing:

```javascript
const utils = require("./utils");

utils.add(5, 3);
utils.subtract(5, 3);
```

you can use **destructuring**:

```javascript
const { add, subtract } = require("./utils");

console.log(add(5, 3));
console.log(subtract(5, 3));
```

This is a very common pattern in Node.js.

---

# 6. What `require()` Actually Gives You

This is a very important concept.

Suppose:

### `data.js`

```javascript
const secret = "hidden";

const publicData = "visible";

module.exports = publicData;
```

And:

### `app.js`

```javascript
const data = require("./data");

console.log(data);
```

Output:

```text
visible
```

But:

```javascript
console.log(secret);
```

will fail because `secret` belongs to `data.js` and was not exported.

### Key Rule

> **A module does not automatically expose all of its variables and functions. You explicitly decide what other modules can access through `module.exports`.**

This module boundary is one of the main benefits of using modules. citeturn0search0

---

# 7. `module.exports` vs `exports`

You will often see both:

```javascript
module.exports;
```

and:

```javascript
exports;
```

Initially, `exports` is a reference to `module.exports`.

Therefore, this works:

```javascript
exports.add = (a, b) => a + b;

exports.subtract = (a, b) => a - b;
```

It is effectively a shortcut for:

```javascript
module.exports.add = (a, b) => a + b;

module.exports.subtract = (a, b) => a - b;
```

### Best beginner rule

> **Use `module.exports` when you want to clearly understand what the module exports.**

---

# 8. Nested Modules and `index.js`

Large applications often group related modules inside folders.

Example:

```text
project/
│
├── app.js
│
└── calculate/
    ├── sum.js
    ├── multiply.js
    └── index.js
```

Now `app.js` can use the folder as a single module entry point:

```javascript
const { calculateSum, calculateMultiply } = require("./calculate");

console.log(calculateSum(5, 3));
console.log(calculateMultiply(5, 3));
```

### Why do this?

Instead of making `app.js` know about many internal files:

```text
app.js
 ├── sum.js
 ├── multiply.js
 ├── divide.js
 └── percentage.js
```

the folder can expose a clean public interface:

```text
app.js
   │
   ▼
calculate/
   │
   └── index.js
```

This pattern becomes particularly useful in large projects.

---

# 9. Importing JSON and Built-in Modules

## Importing JSON

CommonJS `require()` can load JSON files.

### `data.json`

```json
{
  "name": "Satyam",
  "city": "Patna",
  "country": "India"
}
```

### `app.js`

```javascript
const data = require("./data.json");

console.log(data.name);
console.log(data.city);
```

Output:

```text
Satyam
Patna
```

Node.js documents `require()` as supporting local files and JSON in CommonJS. citeturn0search0

---

## Built-in Node.js Modules

Node.js also provides built-in modules.

For example:

```javascript
const util = require("node:util");
```

The `node:` prefix clearly identifies a built-in Node.js module.

The `util` module contains various utilities used by Node.js and application developers. citeturn0search1

Other examples include:

```javascript
require("node:fs");
require("node:path");
require("node:http");
require("node:events");
```

---

# 10. CommonJS vs ES Modules

Node.js supports two major JavaScript module systems:

1. **CommonJS (CJS)**
2. **ECMAScript Modules (ESM)**

## CommonJS

Typical syntax:

```javascript
const greet = require("./greet");

module.exports = greet;
```

Commonly associated with:

```text
.cjs
```

and `.js` files when the package is configured for CommonJS.

---

## ES Modules

ESM uses standard JavaScript:

```javascript
import { greet } from "./greet.js";

export function greet(name) {
  return `Hello, ${name}!`;
}
```

Typical extension:

```text
.mjs
```

or `.js` when the nearest `package.json` contains:

```json
{
  "type": "module"
}
```

Node.js officially supports both CommonJS and ECMAScript modules. citeturn0search3turn0search12

---

## `.cjs` vs `.mjs`

| Feature                           | CommonJS                             | ES Modules                  |
| --------------------------------- | ------------------------------------ | --------------------------- |
| Common syntax                     | `require()`                          | `import`                    |
| Export                            | `module.exports`                     | `export`                    |
| Explicit extension                | `.cjs`                               | `.mjs`                      |
| `.js` behavior                    | Depends on package `"type"`          | Depends on package `"type"` |
| Standard JavaScript module syntax | No                                   | Yes                         |
| Strict mode                       | CommonJS is not automatically strict | ESM is always strict        |

### Important correction

A common beginner explanation is:

> "`.js` means CommonJS."

That is **not always true in modern Node.js**.

Node.js determines how `.js` is interpreted partly from the nearest `package.json` `"type"` field. `.cjs` is always CommonJS and `.mjs` is always ES Module. citeturn0search12

---

# 11. Strict Mode

ES Modules automatically run in **strict mode**.

For example, this is not allowed:

```javascript
x = 10;
```

because `x` was never declared.

Use:

```javascript
let x = 10;
```

or:

```javascript
const x = 10;
```

CommonJS modules do not automatically enable strict mode.

If you want strict mode explicitly, you can write:

```javascript
"use strict";
```

### Why does this matter?

Strict mode catches certain programming mistakes and changes some JavaScript behaviors in a safer, more predictable way.

---

## What About "Synchronous vs Asynchronous"?

The source material describes CommonJS loading as synchronous and ES module loading as asynchronous.

That is useful as a **high-level learning distinction**, but it should not be treated as:

```text
CommonJS = synchronous everything
ESM = asynchronous everything
```

The actual module-loading systems are more nuanced.

A better beginner mental model is:

```text
CommonJS
    require()
    → traditional Node.js module system

ES Modules
    import/export
    → standardized JavaScript module system
    → designed around the ES module loader
```

Node.js supports interoperability between the two systems, with specific rules and limitations. citeturn0search0turn0search3

---

# 12. Quick Revision

## The Core Flow

```text
                 MODULE A
                    │
              module.exports
                    │
                    ▼
              ┌───────────┐
              │  Export   │
              └───────────┘
                    │
                    ▼
              ┌───────────┐
              │  require  │
              └───────────┘
                    │
                    ▼
                 MODULE B
```

### CommonJS

```javascript
// math.js
const add = (a, b) => a + b;

module.exports = add;
```

```javascript
// app.js
const add = require("./math");

console.log(add(5, 3));
```

Output:

```text
8
```

---

## Multiple Exports

```javascript
module.exports = {
  add,
  subtract,
};
```

Import:

```javascript
const { add, subtract } = require("./utils");
```

---

## Single Export

```javascript
module.exports = greet;
```

Import:

```javascript
const greet = require("./greet");
```

---

## Two Module Systems

```text
CommonJS
   ↓
require()
module.exports
.cjs

ES Modules
   ↓
import
export
.mjs
```

---

## Most Important Rules

1. **Variables/functions inside a module are not automatically available everywhere.**
2. **Use `module.exports` to expose functionality from a CommonJS module.**
3. **Use `require()` to load CommonJS modules.**
4. **Destructuring makes multiple imports cleaner.**
5. **`exports.x = x` is a shortcut for adding a property to `module.exports`.**
6. **Do not replace `exports` directly; use `module.exports = ...` when replacing the exported value.**
7. **`.cjs` always means CommonJS.**
8. **`.mjs` always means ES Module.**
9. **`.js` depends on the project's module configuration.**
10. **ES Modules use `import`/`export` and automatically run in strict mode.**

---

# 🎯 Final Mental Model

Think of modules like **rooms with controlled doors**:

```text
┌───────────────────┐
│     utils.js      │
│                   │
│  add()            │
│  subtract()      │
│  secretValue      │
│                   │
│  module.exports ────────────┐
└───────────────────┘         │
                              ▼
                       ┌──────────────┐
                       │    app.js    │
                       │              │
                       │ require()    │
                       │              │
                       │ add()        │
                       │ subtract()   │
                       └──────────────┘
```

The module decides what goes through the door:

```javascript
module.exports = {
  add,
  subtract,
};
```
