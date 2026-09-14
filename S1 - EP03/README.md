# Node.js — Episode 03: Writing Your First Code

> In this episode, we install Node.js, verify the setup, run JavaScript from the terminal and VS Code, understand the Node.js REPL, and learn the difference between `global`, `window`, `this`, and `globalThis`.

---

## 📚 Table of Contents

1. [Install Node.js](#1-install-nodejs)
2. [Verify Node.js and NPM](#2-verify-nodejs-and-npm)
3. [Node.js REPL](#3-nodejs-repl)
4. [Create and Run a JavaScript File](#4-create-and-run-a-javascript-file)
5. [Running JavaScript in VS Code](#5-running-javascript-in-vs-code)
6. [Running JavaScript from CMD](#6-running-javascript-from-cmd)
7. [Global Objects](#7-global-objects)
8. [`window` vs `global` vs `globalThis`](#8-window-vs-global-vs-globalthis)
9. [What is `this` in Node.js?](#9-what-is-this-in-nodejs)

---

# 1. Install Node.js

Node.js allows us to execute JavaScript outside the browser.

Download it from the official website:

**https://nodejs.org/**

The Node.js download page provides different release lines, including **LTS (Long-Term Support)** and **Current** releases. For learning and most production projects, prefer an **LTS** release unless you specifically need a newer feature. Check the official download page for the currently supported LTS version.

### Installation

On Windows:

1. Download the LTS installer.
2. Run the installer.
3. Keep the default installation options unless you have a specific reason to change them.
4. Make sure Node.js is added to your system `PATH`.
5. Complete the installation.

After installation, open a new terminal.

---

# 2. Verify Node.js and NPM

Open **Command Prompt**, PowerShell, or the VS Code terminal.

### Check Node.js

```bash
node -v
```

Example:

```text
v24.x.x
```

The `-v` / `--version` option prints the installed Node.js version.

### Check NPM

```bash
npm -v
```

Example:

```text
11.x.x
```

NPM is the package manager commonly used with Node.js.

### If the command is not recognized

If you see an error such as:

```text
'node' is not recognized as an internal or external command
```

possible causes include:

- Node.js was not installed correctly.
- The terminal was opened before installation; close and reopen it.
- Node.js was not added to `PATH`.

---

# 3. Node.js REPL

REPL stands for:

> **Read → Evaluate → Print → Loop**

Start it by typing:

```bash
node
```

You will see a prompt similar to:

```text
>
```

Now you can directly execute JavaScript:

```javascript
> 10 + 20
30

> const name = "Node.js"
> name
'Node.js'

> console.log("Hello Node.js")
Hello Node.js
```

### What happens?

```text
You type JavaScript
       ↓
Node.js reads it
       ↓
JavaScript is evaluated
       ↓
Result is printed
       ↓
REPL waits for the next command
```

The REPL is excellent for:

- Quickly testing JavaScript
- Experimenting with Node.js APIs
- Learning small concepts
- Checking the result of an expression

### Exit the REPL

Use:

```text
Ctrl + C
```

twice, or:

```text
.exit
```

> **REPL is for experimentation. For real projects, write code in `.js` files.**

---

# 4. Create and Run a JavaScript File

A normal Node.js program is usually stored in a `.js` file.

For example:

```text
my-node-project/
│
└── app.js
```

Put this inside `app.js`:

```javascript
let name = "Node JS 03";

let a = 5;
let b = 10;

let c = a + b;

console.log(name);
console.log(c);
```

Run it from the terminal:

```bash
node app.js
```

Output:

```text
Node JS 03
15
```

### What did Node.js do?

```text
app.js
   ↓
node app.js
   ↓
Node.js runtime
   ↓
JavaScript executes
   ↓
Output appears in terminal
```

---

# 5. Running JavaScript in VS Code

[Visual Studio Code](https://code.visualstudio.com/) provides an integrated terminal, so you can write and run Node.js programs without leaving the editor.

## Recommended Project Setup

Create a folder:

```text
node-03/
│
└── app.js
```

Open the folder in VS Code:

```text
File → Open Folder
```

Create:

```text
app.js
```

Write:

```javascript
console.log("Hello, World!");
```

Open the integrated terminal:

```text
Ctrl + `
```

Then run:

```bash
node app.js
```

Output:

```text
Hello, World!
```

VS Code's integrated terminal can run the same shell commands you would normally run in Command Prompt, PowerShell, Git Bash, or another terminal.

---

# 6. Running JavaScript from CMD

You can also work entirely from Command Prompt.

### Step 1 — Open CMD

Press:

```text
Win + R
```

Type:

```text
cmd
```

Press Enter.

### Step 2 — Navigate to your project

Use:

```bash
cd path\to\your\project
```

For example:

```bash
cd Desktop\node-03
```

### Step 3 — Run the file

```bash
node app.js
```

Output:

```text
Hello, World!
```

### Useful commands

| Command       | Purpose               |
| ------------- | --------------------- |
| `node -v`     | Check Node.js version |
| `npm -v`      | Check NPM version     |
| `node`        | Start Node.js REPL    |
| `node app.js` | Execute `app.js`      |
| `cd folder`   | Move into a folder    |
| `cd ..`       | Move one folder back  |

---

# 7. Global Objects

Now we move from **running code** to understanding the Node.js environment.

JavaScript runs inside a **host environment**.

The host provides environment-specific features.

For example:

```text
Browser
   ↓
JavaScript Engine + Browser APIs
   ↓
window, document, fetch, etc.
```

Node.js:

```text
Node.js
   ↓
V8 + Node.js Runtime APIs
   ↓
global, process, timers, fs, etc.
```

This is why browser JavaScript and Node.js JavaScript are not exactly the same environment.

---

# 8. `window` vs `global` vs `globalThis`

## Browser: `window`

In a typical browser page, the global object is associated with:

```javascript
window;
```

For example:

```javascript
console.log(window);
```

Browser APIs such as the DOM are provided by the browser environment.

---

## Node.js: `global`

Node.js historically provides:

```javascript
global;
```

You can try:

```javascript
console.log(global);
```

It exposes the Node.js global namespace.

Node.js documentation currently marks `global` as **legacy** and recommends using `globalThis` instead.

---

## Modern JavaScript: `globalThis`

The standardized way to access the global `this` value across JavaScript environments is:

```javascript
globalThis;
```

In Node.js:

```javascript
console.log(globalThis);
```

In Node.js:

```javascript
globalThis === global;
```

evaluates to:

```text
true
```

In a typical browser environment:

```javascript
globalThis === window;
```

evaluates to:

```text
true
```

### The important idea

```text
Browser
   window
     │
     └── globalThis

Node.js
   global
     │
     └── globalThis
```

So `globalThis` provides a consistent way to refer to the global object across environments.

---

# 9. What is `this` in Node.js?

The following code:

```javascript
console.log(this);
```

produces:

```text
{}
```

when executed at the top level of a Node.js module.

That does **not** mean:

```javascript
this === global;
```

At the top level of a Node.js module, `this` is associated with the module's export object, not the Node.js global object.

For example:

```javascript
console.log(this === global);
```

will be:

```text
false
```

### Use `globalThis` when you mean the global object

```javascript
console.log(globalThis);
```

This is clearer and portable.

---

## `this` Depends on Context

The value of `this` in JavaScript depends on how the code is executed.

For example:

```javascript
const user = {
  name: "Satyam",

  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Output:

```text
Satyam
```

Here, `this` refers to `user`.

Therefore:

> **Do not treat `this` and the global object as the same concept.**

---

# 10. Quick Revision

## Node.js Setup

```text
Install Node.js
      ↓
node -v
      ↓
npm -v
      ↓
Create app.js
      ↓
node app.js
```

## REPL

```text
REPL
 ↓
Read
 ↓
Evaluate
 ↓
Print
 ↓
Loop
```

Start it with:

```bash
node
```

---

## Runtime Mental Model

```text
                Node.js
                   │
          ┌────────┴────────┐
          │                 │
        V8 Engine      Node.js APIs
          │                 │
          │          ┌──────┼──────┐
          │          │      │      │
       JavaScript   FS    HTTP   Process
          │
          ▼
       Execution
```

---

## Global Object Mental Model

```text
                JavaScript Environment
                         │
             ┌───────────┴───────────┐
             │                       │
          Browser                  Node.js
             │                       │
          window                   global
             │                       │
             └───────────┬───────────┘
                         │
                     globalThis
```

> `global` is Node.js-specific and legacy; `globalThis` is the modern cross-environment choice.

---

# 🎯 Final Takeaway

You should now understand this complete workflow:

```text
Install Node.js
      ↓
Verify with node -v
      ↓
Verify NPM with npm -v
      ↓
Experiment with node (REPL)
      ↓
Create app.js
      ↓
Write JavaScript
      ↓
Run with node app.js
      ↓
Understand the Node.js runtime
      ↓
Understand global / globalThis / this
```
