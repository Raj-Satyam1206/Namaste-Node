# Node.js — Episode 05: How Modules and `require()` Work Behind the Scenes

> This episode goes one level deeper: how Node.js keeps modules private, how the CommonJS wrapper works, what `require()` does internally, why modules are cached, and where these mechanisms live in the Node.js source code.

---

## 📚 Table of Contents

1. [Why Look Behind the Scenes?](#1-why-look-behind-the-scenes)
2. [IIFE and Scope](#2-iife-and-scope)
3. [How Node.js Keeps Modules Private](#3-how-nodejs-keeps-modules-private)
4. [`module.exports` and the Module Object](#4-moduleexports-and-the-module-object)
5. [How `require()` Works](#5-how-require-works)
6. [Module Caching](#6-module-caching)
7. [What Happens When Three Files Require the Same Module?](#7-what-happens-when-three-files-require-the-same-module)
8. [The Node.js Source Code](#8-the-nodejs-source-code)
9. [Where Does `require()` Come From?](#9-where-does-require-come-from)
10. [Where Does `setTimeout()` Come From?](#10-where-does-settimeout-come-from)
11. [libuv — One of Node.js's Core Components](#11-libuv--one-of-nodejss-core-components)

---

# 1. Why Look Behind the Scenes?

In the previous episode, we learned:

```javascript
const add = require("./math");
```

and:

```javascript
module.exports = add;
```

Now the question is:

> **What actually happens inside Node.js when `require()` is executed?**

Understanding this helps connect JavaScript concepts such as:

- Scope
- Functions
- Closures
- Modules
- `module.exports`
- `require()`
- Caching

with the Node.js runtime.

Node.js treats each CommonJS file as a separate module. citeturn0search0

---

# 2. IIFE and Scope

## What is an IIFE?

**IIFE = Immediately Invoked Function Expression**

It is a function that is created and immediately executed:

```javascript
(function () {
  console.log("Running immediately");
})();
```

Compare this with a normal function:

```javascript
function greet() {
  console.log("Hello");
}

greet();
```

The difference is:

```text
Normal Function
    ↓
Define
    ↓
Call later

IIFE
    ↓
Define
    ↓
Immediately execute
```

## Why is an IIFE useful?

A function creates its own scope.

```javascript
function test() {
  const secret = 123;
}

console.log(secret); // ReferenceError
```

`secret` belongs to the function's scope.

An IIFE can use the same idea:

```javascript
(function () {
  const secret = 123;
})();

console.log(secret); // ReferenceError
```

This provides **encapsulation**.

---

# 3. How Node.js Keeps Modules Private

This is the central idea of the episode.

For a CommonJS module, Node.js uses a function wrapper conceptually like:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your module code
});
```

The official Node.js documentation describes this as the **module wrapper**. citeturn0search0

Because your code is inside this function, top-level variables such as:

```javascript
const secret = "private";
```

are scoped to that module rather than becoming properties of the global object.

Therefore:

```text
moduleA.js
┌──────────────────────────┐
│ function wrapper         │
│                          │
│ const secret = "hidden"  │
│ function privateFn() {}  │
│                          │
└──────────────────────────┘
             │
             │ only exported values
             ▼
         moduleB.js
```

### Key Rule

> **A CommonJS module's variables are private by default. Only exported values are intentionally exposed to other modules.**

---

# 4. `module.exports` and the Module Object

You may wonder:

> Where did `module` come from?

Node.js provides a `module` object to each CommonJS module through the module wrapper.

Conceptually:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // module is available here
});
```

So when you write:

```javascript
module.exports = {
  add,
  subtract,
};
```

you are setting the value that Node.js will make available to code that requires this module.

### Example

#### `math.js`

```javascript
function add(a, b) {
  return a + b;
}

module.exports = {
  add,
};
```

#### `app.js`

```javascript
const math = require("./math");

console.log(math.add(5, 3));
```

Output:

```text
8
```

Think of it as:

```text
math.js
   │
   │ module.exports
   ▼
Exported object
   │
   │ require("./math")
   ▼
app.js
```

---

# 5. How `require()` Works

For a beginner-friendly mental model, think of CommonJS `require()` as going through these stages:

```text
require("./math")
       │
       ▼
1. Resolve
       │
       ▼
2. Load
       │
       ▼
3. Wrap
       │
       ▼
4. Evaluate
       │
       ▼
5. Cache
       │
       ▼
Return module.exports
```

Let's understand each step.

---

## 5.1 Step 1 — Resolve

Node.js first determines **which module you mean**.

For example:

```javascript
require("./math");
```

Node.js resolves the request relative to the requesting module.

It can also resolve:

```javascript
require("node:fs");
```

or packages from `node_modules`.

CommonJS resolution also has rules for files, JSON, directories and packages. citeturn0search15

---

## 5.2 Step 2 — Load

After resolving the module, Node.js loads it according to its type.

For example:

```text
.js     → JavaScript
.json   → JSON
.node   → Native addon
```

The exact loading behavior depends on the module type and Node.js module system. citeturn0search15

---

## 5.3 Step 3 — Wrap

For CommonJS JavaScript files, Node.js provides the module wrapper:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // module code
});
```

This gives the module its own scope and provides useful module-specific variables.

Official Node.js documentation confirms that this wrapper is used before a CommonJS module is executed. citeturn0search0

---

## 5.4 Step 4 — Evaluate

Node.js executes the module code.

For example:

```javascript
const message = "Hello";

module.exports = message;
```

The code runs and `module.exports` becomes:

```text
"Hello"
```

`require()` then returns that exported value.

---

## 5.5 Step 5 — Cache

After a module is loaded, Node.js caches it.

This is extremely important.

If the same resolved module is required again:

```javascript
require("./math");
```

Node.js can return the cached module instead of executing the module code again.

Node.js documents this behavior through `require.cache`. citeturn0search10turn0search14

---

# 6. Module Caching

Suppose:

```text
app.js
   │
   ├── require("./xyz")
   │
sum.js
   │
   └── require("./xyz")
```

The first request for `xyz` loads and evaluates it.

```text
First require("./xyz")
        ↓
Resolve
        ↓
Load
        ↓
Wrap
        ↓
Evaluate
        ↓
Cache
```

A later request can use the cached result:

```text
Second require("./xyz")
        ↓
Check cache
        ↓
Found
        ↓
Return cached exports
```

### Why cache?

Without caching, a module's initialization code could run repeatedly whenever the module was required.

Caching avoids unnecessary loading and evaluation work and is therefore important for performance.

---

# 7. What Happens When Three Files Require the Same Module?

Imagine:

```text
app.js
sum.js
multiply.js
xyz.js
```

All three require `xyz.js`.

```text
app.js ──────────┐
sum.js ──────────┼──► xyz.js
multiply.js ─────┘
```

### First request

Suppose `sum.js` executes:

```javascript
require("./xyz");
```

Node.js:

```text
Resolve xyz
   ↓
Load xyz
   ↓
Wrap xyz
   ↓
Evaluate xyz
   ↓
Store in cache
   ↓
Return exports
```

### Later requests

When `app.js` and `multiply.js` also require the same resolved module:

```text
require("./xyz")
      ↓
Check cache
      ↓
Module already loaded
      ↓
Return cached exports
```

The module's top-level initialization does not normally run again.

### Important

The cache is associated with the **resolved module filename**, so two requests that resolve to different files are not necessarily the same cache entry. citeturn0search14

---

# 8. The Node.js Source Code

Node.js is an **open-source project**, so its implementation can be inspected publicly.

GitHub:

**https://github.com/nodejs/node**

For this episode, the most useful areas to understand are:

```text
node/
│
├── lib/
│   ├── timers/
│   ├── internal/
│   │   └── modules/
│   │       └── cjs/
│   │           └── loader.js
│   │
│   └── ...
│
├── src/
├── deps/
└── ...
```

The `lib/` directory contains much of Node.js's JavaScript-side implementation, while other directories contain native code, dependencies, tests and tooling.

### Why inspect the source?

You do **not** need to understand the entire Node.js repository.

The purpose is to develop the habit of asking:

> "Where does this function actually come from?"

That mindset is extremely useful for backend development.

---

# 9. Where Does `require()` Come From?

In CommonJS modules, `require` is provided as part of the module-loading mechanism.

The source material points to:

```text
lib/internal/modules/helpers.js
```

and the function:

```text
makeRequireFunction()
```

The current Node.js source uses internal module-loader helpers to construct the `require` function for a module.

Conceptually:

```text
Node.js creates Module
        ↓
Creates module-specific require()
        ↓
require() knows which module requested it
        ↓
require() resolves and loads another module
```

The `require` function also exposes functionality such as:

```javascript
require.resolve(...)
require.cache
```

and other loader-related properties depending on the Node.js version. citeturn0search11

### Important

`require` is **not a normal global function** that every JavaScript environment automatically provides.

It is part of the CommonJS module environment created by Node.js.

---

# 10. Where Does `setTimeout()` Come From?

You may write:

```javascript
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

But where does `setTimeout()` come from?

Node.js provides timer APIs as part of its runtime.

The implementation is connected to Node.js's timer subsystem, while lower-level asynchronous/event-loop work involves components such as **libuv**.

This is a good example of how a simple JavaScript API can be backed by a much larger runtime implementation.

---

# 11. libuv — One of Node.js's Core Components

The episode refers to **libuv** as one of Node.js's major "superpowers."

A more precise description is:

> **libuv is a cross-platform library that provides an event loop and asynchronous I/O facilities used by Node.js.**

libuv provides infrastructure for things such as:

- Event loops
- Timers
- Non-blocking networking
- Asynchronous file-system operations
- Child processes
- Cross-platform I/O abstractions

citeturn0search4turn0search5

### Simplified Node.js Architecture

```text
                 Node.js
                    │
        ┌───────────┴───────────┐
        │                       │
       V8                    Node APIs
        │                       │
        │                ┌──────┴──────┐
        │                │             │
        │              HTTP           FS
        │                │             │
        └────────────┬───┴─────────────┘
                     │
                   libuv
                     │
                     ▼
             OS / System APIs
```

### Important

Do not think:

> "libuv is all of Node.js."

It is one important component of Node.js's runtime architecture.

---

# 12. Important Corrections to the Simplified Model

The study material intentionally uses simplified explanations. These are useful for learning, but keep the following distinctions in mind.

### 1. "Node.js wraps code in an IIFE"

This is a useful mental model.

More precisely, Node.js uses a **CommonJS module wrapper function**:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // code
});
```

The wrapper provides module scope and module-specific variables. citeturn0search0

---

### 2. "Node.js compiles the module to machine code"

Avoid thinking of `require()` as simply:

```text
Read file → compile to machine code → execute
```

Modern Node.js/V8 execution involves multiple layers of parsing, compilation and runtime optimization.

For understanding CommonJS, the more useful model is:

```text
Resolve
  ↓
Load
  ↓
Wrap
  ↓
Evaluate
  ↓
Cache
  ↓
Return exports
```

---

### 3. "IIFE is the reason modules are private"

The wrapper function is an important part of CommonJS module isolation, but the bigger concept is **module scope**.

Node.js explicitly creates a separate module scope for each CommonJS file. citeturn0search0

---

### 4. "Caching means the module is always loaded only once"

More accurately:

> A resolved CommonJS module is normally cached after its first load, and subsequent `require()` calls that resolve to that same module return the cached exports.

The cache can be inspected and modified through `require.cache`. citeturn0search10

---

# 13. Quick Revision

## The Complete `require()` Mental Model

```text
require("./math")
       │
       ▼
┌──────────────────┐
│ 1. Resolve       │
│ Find the module  │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 2. Load          │
│ Read module      │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 3. Wrap          │
│ CommonJS wrapper │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 4. Evaluate      │
│ Run module code  │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 5. Cache         │
│ Store exports    │
└────────┬─────────┘
         ▼
   module.exports
```

---

## The Module Wrapper

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your CommonJS code
});
```

This explains why these are available inside a CommonJS module:

```javascript
exports;
require;
module;
__filename;
__dirname;
```

---
