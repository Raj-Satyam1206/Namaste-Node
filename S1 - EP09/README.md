# Episode 09 — libuv & Event Loop

![Node.js](https://img.shields.io/badge/Node.js-Event%20Loop-green?logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-Asynchronous%20Execution-yellow?logo=javascript)
![libuv](https://img.shields.io/badge/libuv-Event%20Loop-blue)
![Episode](https://img.shields.io/badge/Episode-09-orange)

> A detailed study of **libuv, the Node.js event loop, callback queues, thread pool, microtasks, event-loop phases, and asynchronous execution order**.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Learning Objectives](#-learning-objectives)
- [What is libuv?](#-what-is-libuv)
- [Why libuv is Important in Node.js](#-why-libuv-is-important-in-nodejs)
- [V8 vs libuv](#-v8-vs-libuv)
- [Callback Queue](#-callback-queue)
- [Thread Pool](#-thread-pool)
- [How an Asynchronous Operation Works](#-how-an-asynchronous-operation-works)
- [Non-Blocking I/O](#-non-blocking-io)
- [The Event Loop](#-the-event-loop)
- [Event Loop Phases](#-event-loop-phases)
  - [1. Timers Phase](#1-timers-phase)
  - [2. Poll Phase](#2-poll-phase)
  - [3. Check Phase](#3-check-phase)
  - [4. Close Callbacks Phase](#4-close-callbacks-phase)
- [Microtasks](#-microtasks)
- [`process.nextTick()`](#-processnexttick)
- [Promise Callbacks](#-promise-callbacks)
- [Important Execution Order](#-important-execution-order)
- [Poll Phase When the Event Loop is Empty](#-poll-phase-when-the-event-loop-is-empty)
- [`setTimeout()` vs `setImmediate()`](#-settimeout-vs-setimmediate)
- [`fs.readFile()` and the Poll Phase](#-fsreadfile-and-the-poll-phase)
- [Output Question 1](#-output-question-1)
- [Output Question 2](#-output-question-2)
- [Output Question 3](#-output-question-3)
- [Output Question 4](#-output-question-4)

---

# 🧐 Overview

Node.js is designed around an **asynchronous, non-blocking I/O model**.

This creates an important question:

> If JavaScript execution is single-threaded, how can Node.js perform file operations, network operations, DNS lookups, and other asynchronous work without blocking the JavaScript execution?

The answer in this episode is built around:

- **V8**
- **libuv**
- **Event Loop**
- **Callback Queues**
- **Thread Pool**
- **Microtasks**
- `process.nextTick()`
- Promise callbacks
- Event-loop phases

---

# 🚀 What is libuv?

**libuv** is an important library used by Node.js for asynchronous operations and event-loop infrastructure.

The episode focuses on three major concepts associated with libuv:

```text
                    LIBUV
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
      Event Loop   Callback    Thread Pool
                    Queues
```

The source material introduces libuv specifically in the context of Node.js asynchronous handling, callback queues, thread pools, and non-blocking I/O.

---

# 💡 Why libuv is Important in Node.js

Suppose JavaScript starts a file read:

```javascript
fs.readFile("file.txt", "utf8", callback);
```

If JavaScript had to wait synchronously for the file operation to finish, the JavaScript execution path could become blocked.

Instead, the operation is handled asynchronously through Node.js/libuv infrastructure.

Conceptually:

```text
JavaScript
    │
    │ Start asynchronous operation
    ▼
  libuv
    │
    ├──────────────► OS / I/O
    │
    └──────────────► Thread Pool
    │
    ▼
 Callback becomes ready
    │
    ▼
 Event Loop
    │
    ▼
 Call Stack
    │
    ▼
JavaScript Callback
```

This is the basic mechanism that allows Node.js to continue doing other work while asynchronous operations are in progress.

---

# 🧠 V8 vs libuv

It is important not to treat V8 and libuv as the same thing.

## V8

V8 is the JavaScript engine responsible for executing JavaScript.

```text
JavaScript
     ↓
    V8
     ↓
JavaScript Execution
```

## libuv

libuv provides important asynchronous/event-loop infrastructure used by Node.js.

```text
Node.js
   │
   ├── V8
   │    └── JavaScript execution
   │
   └── libuv
        ├── Event Loop
        ├── Callback Queues
        └── Thread Pool
```

### Simple mental model

> **V8 executes JavaScript; libuv coordinates asynchronous work and event-loop infrastructure.**

The Episode-09 PDF describes asynchronous tasks being offloaded to libuv while the V8 engine can continue processing JavaScript.

---

# 📬 Callback Queue

A callback queue stores callbacks that are ready to be processed after an asynchronous operation completes.

Conceptually:

```text
Asynchronous Operation
        ↓
Operation Completes
        ↓
Callback Becomes Ready
        ↓
Callback Queue
        ↓
Event Loop
        ↓
Call Stack
        ↓
Callback Executes
```

The source README explains that callbacks are stored after asynchronous operations complete and that the event loop processes them when the call stack is empty.

---

# 🧵 Thread Pool

The **thread pool** is used for suitable time-consuming operations that should not block the event-loop execution path.

The episode specifically mentions examples such as:

- File-system operations
- Cryptographic functions

Conceptually:

```text
                 libuv
                   │
            ┌──────┴──────┐
            │             │
            ▼             ▼
           OS        Thread Pool
                          │
                          ▼
                     Worker Threads
```

### Important distinction

The thread pool does not mean:

> "JavaScript itself becomes multi-threaded."

Rather, it provides worker threads that can handle suitable background work while JavaScript execution remains separate.

---

# 🔄 How an Asynchronous Operation Works

Consider:

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", () => {
  console.log("File Reading CB");
});
```

A simplified flow is:

```text
JavaScript calls fs.readFile()
              │
              ▼
            libuv
              │
              ▼
             OS
              │
              │ File operation
              ▼
       Operation completes
              │
              ▼
      Callback becomes ready
              │
              ▼
          Poll Queue
              │
              ▼
          Event Loop
              │
              ▼
          Call Stack
              │
              ▼
       Callback Executes
```

The Episode-09 material explains that libuv can initiate the file operation through the OS and later handle the callback once the operation has completed.

---

# 🚫 Non-Blocking I/O

The key idea behind Node.js's asynchronous architecture is **non-blocking I/O**.

Suppose:

```javascript
fs.readFile("file.txt", callback);

console.log("Continue");
```

The JavaScript program can continue executing:

```text
fs.readFile()
      ↓
  Start I/O
      ↓
  JavaScript continues
      ↓
console.log("Continue")
```

Later:

```text
File operation completes
        ↓
Callback becomes ready
        ↓
Event Loop
        ↓
Callback executes
```

This is why asynchronous I/O can be performed without forcing the JavaScript execution path to wait synchronously.

---

# 📚 Multiple Asynchronous Operations

Imagine that several operations complete or become eligible around the same time:

```javascript
setTimeout(...);

fs.readFile(...);

someAsyncOperation(...);
```

The event-loop system must determine when the corresponding callbacks should execute.

The supplied README describes separate callback queues for different categories of tasks, including timers, API calls, and file reads.

Conceptually:

```text
                       libuv
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Timer Queue      I/O Queue     Other Queues
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    Event Loop
                         │
                         ▼
                    Call Stack
```

---

# 🔁 The Event Loop

The **event loop** coordinates when asynchronous callbacks can be moved toward JavaScript execution.

A simplified model is:

```text
              Call Stack
                  │
                  ▼
           Is Stack Empty?
             /        \
           NO          YES
           │            │
           │            ▼
           │       Check Pending
           │          Work
           │            │
           │            ▼
           │       Select Ready
           │         Callback
           │            │
           └────────────┘
                        │
                        ▼
                  Call Stack
```

The Episode-09 source explains that the event loop continuously monitors the call stack and, when it is empty, takes appropriate tasks from callback queues for execution.

---

# 🔥 Event Loop Phases

The source material presents four major phases:

```text
       ┌──────────────┐
       │    TIMERS    │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │     POLL     │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │    CHECK     │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │    CLOSE     │
       └──────┬───────┘
              │
              ▼
           Repeat
```

The four phases covered in the episode are:

1. **Timers**
2. **Poll**
3. **Check**
4. **Close Callbacks**

---

# 1. Timers Phase

The **Timers phase** handles timer callbacks associated with:

```javascript
setTimeout();
setInterval();
```

Example:

```javascript
setTimeout(() => {
  console.log("Timer expired");
}, 0);
```

The callback does not execute immediately.

Instead, the timer becomes eligible and is handled by the timers mechanism when the event loop reaches the appropriate point.

### Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

The synchronous output occurs first:

```text
Start
End
```

The timer callback comes later:

```text
Timer
```

### Important

```javascript
setTimeout(callback, 0);
```

does **not** mean:

```text
Run callback immediately.
```

It means the callback is scheduled through the timer mechanism.

---

# 2. Poll Phase

The **Poll phase** is associated with I/O callbacks.

The episode uses:

```javascript
fs.readFile();
```

as a major example.

Conceptually:

```text
File Read
    ↓
I/O completes
    ↓
Callback ready
    ↓
Poll Phase
    ↓
Callback executes
```

The Poll phase is therefore one of the most important phases when understanding Node.js file and I/O operations.

---

# 3. Check Phase

The **Check phase** is where callbacks scheduled using:

```javascript
setImmediate();
```

are handled.

Example:

```javascript
setImmediate(() => {
  console.log("setImmediate");
});
```

The simplified relationship is:

```text
Poll
  ↓
Check
  ↓
setImmediate()
```

This is why `setImmediate()` is closely associated with the Check phase.

---

# 4. Close Callbacks Phase

The **Close Callbacks phase** handles callbacks associated with closing operations.

For example:

```text
Socket closes
      ↓
Close callback
      ↓
Close Callbacks Phase
```

The source material mentions socket closures and cleanup as examples.

---

# 📊 Event Loop Phase Summary

| Phase               | Main Responsibility       | Example                         |
| ------------------- | ------------------------- | ------------------------------- |
| **Timers**          | Timer callbacks           | `setTimeout()`, `setInterval()` |
| **Poll**            | I/O callbacks             | `fs.readFile()`                 |
| **Check**           | Immediate callbacks       | `setImmediate()`                |
| **Close Callbacks** | Closing/cleanup callbacks | Socket close                    |

---

# ⚠️ Microtasks

The episode gives special importance to:

```javascript
process.nextTick();
```

and:

```javascript
Promise callbacks
```

These are discussed as microtask-related work that is processed before the event loop proceeds through its main phases.

The source material explicitly highlights the interaction between `process.nextTick()`, Promises, and the main event-loop phases.

---

# 🚨 `process.nextTick()`

Node.js provides:

```javascript
process.nextTick();
```

Example:

```javascript
process.nextTick(() => {
  console.log("Process.nextTick");
});
```

The episode gives `process.nextTick()` higher priority than Promise callbacks.

A simplified execution model is:

```text
Synchronous Code
       ↓
process.nextTick()
       ↓
Promise callbacks
       ↓
Event Loop phases
```

---

# 🤝 Promise Callbacks

Consider:

```javascript
Promise.resolve("promise").then(console.log);
```

The `.then()` callback is handled as a Promise microtask.

Conceptually:

```text
Promise resolved
      ↓
.then() callback
      ↓
Promise Microtask
      ↓
Execute
```

In the source's model, Promise callbacks execute after pending `process.nextTick()` callbacks and before moving through the main event-loop phases.

---

# 🥇 Important Execution Order

For the examples covered in this episode, the most useful simplified model is:

```text
1. Synchronous Code
          ↓
2. process.nextTick()
          ↓
3. Promise Callbacks
          ↓
4. Event Loop Phases
```

Then:

```text
Timers
   ↓
Poll
   ↓
Check
   ↓
Close Callbacks
```

So:

```text
┌───────────────────────────┐
│    Synchronous Code       │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│    process.nextTick()     │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│    Promise Callbacks      │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│       Timers Phase        │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│        Poll Phase         │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│        Check Phase        │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│   Close Callbacks Phase   │
└───────────────────────────┘
```

> **Source note:** This is the simplified execution model used by the supplied Episode-09 material for teaching the examples. Actual Node.js behavior contains additional implementation details and can depend on timing, context, platform, and Node.js version.

---

# 💤 Poll Phase When the Event Loop is Empty

One of the most important notes in the accompanying README is:

> When the event loop is empty and there are no more tasks to execute, it enters the poll phase and essentially waits for incoming events.

Conceptually:

```text
No pending work
      ↓
Poll Phase
      ↓
Wait for incoming event
      ↓
Event arrives
      ↓
Process event
```

This is an important part of understanding why the event loop does not simply stop whenever there is temporarily no callback ready to execute.

---

# ⏱️ `setTimeout()` vs `setImmediate()`

These APIs are frequently confused.

## `setTimeout()`

```javascript
setTimeout(() => {
  console.log("Timer");
}, 0);
```

Associated with:

```text
Timers Phase
```

## `setImmediate()`

```javascript
setImmediate(() => {
  console.log("Immediate");
});
```

Associated with:

```text
Check Phase
```

### Simplified relationship

```text
setTimeout()
     ↓
Timers

setImmediate()
     ↓
Check
```

### Important

Do not assume that:

```text
setImmediate() always executes before setTimeout()
```

or:

```text
setTimeout() always executes before setImmediate()
```

without considering **where they were scheduled and the current state of the event loop**.

The episode's top-level example demonstrates the timer callback being processed before `setImmediate()`.

---

# 📂 `fs.readFile()` and the Poll Phase

Example:

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", () => {
  console.log("File Reading CB");
});
```

Simplified execution:

```text
fs.readFile()
      ↓
    libuv
      ↓
      OS
      ↓
File read completes
      ↓
I/O callback becomes ready
      ↓
    Poll Phase
      ↓
Callback executes
```

This is why `fs.readFile()` is repeatedly used in the episode's output questions.

---

# 🧪 Output Question 1

The first major output problem contains:

- `setImmediate()`
- `fs.readFile()`
- `setTimeout(..., 0)`
- synchronous function execution

A simplified version is:

```javascript
const fs = require("fs");

const a = 100;

setImmediate(() => {
  console.log("setImmediate");
});

fs.readFile("file.txt", "utf8", () => {
  console.log("File Reading CB");
});

setTimeout(() => {
  console.log("Timer expired");
}, 0);

function printA() {
  console.log("a =", a);
}

printA();

console.log("Last line of the file.");
```

## Step 1 — Synchronous execution

```javascript
const a = 100;
```

Then asynchronous operations are registered.

Next:

```javascript
printA();
```

prints:

```text
a = 100
```

Finally:

```javascript
console.log("Last line of the file.");
```

prints:

```text
Last line of the file.
```

At this point the synchronous code has finished.

---

## Step 2 — Timers

The timer callback executes:

```text
Timer expired
```

---

## Step 3 — Check

The `setImmediate()` callback executes:

```text
setImmediate
```

---

## Step 4 — File I/O

Once the file read has completed, the file-read callback executes:

```text
File Reading CB
```

### Final Output

The source material gives:

```text
a = 100
Last line of the file.
Timer expired
setImmediate
File Reading CB
```

---

# 🧪 Output Question 2

The second example introduces:

- `setImmediate()`
- `Promise.resolve()`
- `fs.readFile()`
- `setTimeout()`
- `process.nextTick()`
- synchronous code

Conceptually:

```javascript
const fs = require("fs");

const a = 100;

setImmediate(() => {
  console.log("setImmediate");
});

Promise.resolve("promise").then(console.log);

fs.readFile("file.txt", "utf8", () => {
  console.log("File Reading CB");
});

setTimeout(() => {
  console.log("Timer expired");
}, 0);

process.nextTick(() => {
  console.log("Process.nextTick");
});

function printA() {
  console.log("a =", a);
}

printA();

console.log("Last line of the file.");
```

---

## Step 1 — Synchronous Code

```text
a = 100
Last line of the file.
```

---

## Step 2 — `process.nextTick()`

The `process.nextTick()` callback executes:

```text
Process.nextTick
```

---

## Step 3 — Promise

The Promise callback executes:

```text
promise
```

---

## Step 4 — Timers

The timer callback executes:

```text
Timer expired
```

---

## Step 5 — Poll

The file-read callback executes:

```text
File Reading CB
```

---

## Step 6 — Check

The `setImmediate()` callback executes:

```text
setImmediate
```

### Final Output

The source material gives:

```text
a = 100
Last line of the file.
Process.nextTick
promise
Timer expired
setImmediate
File Reading CB
```

---

# 🧪 Output Question 3

The third example is more complex because asynchronous callbacks schedule **additional asynchronous work**.

The important operations include:

```javascript
setImmediate();
setTimeout();
Promise.resolve();
fs.readFile();
process.nextTick();
```

Inside the file-read callback, more work is scheduled:

```javascript
setTimeout(() => console.log("2nd timer"), 0);

process.nextTick(() => console.log("2nd nextTick"));

setImmediate(() => console.log("2nd setImmediate"));

console.log("File reading CB");

process.nextTick(() => console.log("Process.nextTick"));
```

---

## Step 1 — Synchronous Code

The synchronous statement:

```javascript
console.log("Last line of the file.");
```

runs before asynchronous callbacks.

Output begins with:

```text
Last line of the file.
```

---

## Step 2 — Microtasks

The episode processes the relevant `process.nextTick()` and Promise callbacks.

Output:

```text
Process.nextTick
promise
```

---

## Step 3 — Timers

The initial timer executes:

```text
Timer expired
```

---

## Step 4 — Check

The relevant `setImmediate()` callbacks execute:

```text
setImmediate
2nd setImmediate
```

---

## Step 5 — Poll / I/O

The file-read callback is processed and additional work scheduled from that callback is handled.

The remaining output in the source is:

```text
2nd timer
File reading CB
```

### Final Output

The source material gives:

```text
Last line of the file.
Process.nextTick
promise
Timer expired
setImmediate
2nd setImmediate
2nd timer
File reading CB
```

---

# 🧪 Output Question 4

The fourth example focuses on **nested `process.nextTick()` callbacks**.

The key concept is:

```javascript
process.nextTick(() => {
  console.log("Process.nextTick");

  process.nextTick(() => {
    console.log("inner nextTick");
  });
});
```

The nested callback is scheduled during execution of the outer `process.nextTick()` callback.

The episode emphasizes that `process.nextTick()` callbacks have higher priority than other asynchronous operations in the model being taught.

---

## Execution Flow

### Synchronous Code

```text
Last line of the file.
```

---

### First `process.nextTick()`

```text
Process.nextTick
```

During this callback, another `process.nextTick()` is scheduled.

---

### Nested `process.nextTick()`

```text
inner nextTick
```

---

### Promise

```text
promise
```

---

### Timer

```text
Timer expired
```

---

### Poll

```text
File Reading CB
```

---

### Check

```text
setImmediate
```

### Final Output

The source material gives:

```text
Last line of the file.
Process.nextTick
inner nextTick
promise
Timer expired
setImmediate
File Reading CB
```

---

# 🧩 Why These Output Questions Are Important

These questions are not really about memorizing output.

They test whether you understand:

```text
Synchronous execution
        ↓
Callback registration
        ↓
Microtasks
        ↓
Event-loop phases
        ↓
Queue priority
        ↓
Nested callback scheduling
```

The most important habit is:

> **Do not execute asynchronous callbacks simply according to where their functions appear in the source code.**

Instead, identify the queue and phase associated with each callback.

---

# 🛠️ How to Solve Event Loop Output Questions

Use this method every time.

## Step 1 — Mark synchronous statements

For example:

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");
```

Immediately identify:

```text
A
C
```

as synchronous output.

---

## Step 2 — Classify every asynchronous operation

Create a mental table:

| API                  | Category                                 |
| -------------------- | ---------------------------------------- |
| `setTimeout()`       | Timers                                   |
| `setInterval()`      | Timers                                   |
| `fs.readFile()`      | I/O / Poll                               |
| `setImmediate()`     | Check                                    |
| `process.nextTick()` | High-priority microtask-related callback |
| `Promise.then()`     | Promise microtask                        |

---

## Step 3 — Process `process.nextTick()`

For the model used in this episode:

```text
process.nextTick()
```

comes before Promise callbacks.

---

## Step 4 — Process Promise callbacks

Then execute:

```javascript
Promise.resolve().then(...)
```

callbacks.

---

## Step 5 — Move through event-loop phases

Use:

```text
Timers
   ↓
Poll
   ↓
Check
   ↓
Close
```

---

## Step 6 — Consider operation completion

For:

```javascript
fs.readFile(...)
```

the callback cannot execute until the underlying file operation is complete.

Therefore, I/O timing matters.

---

## Step 7 — Look for nested scheduling

If a callback contains:

```javascript
process.nextTick(...)
```

or:

```javascript
setImmediate(...)
```

or:

```javascript
setTimeout(...)
```

those are **new scheduled tasks**.

Do not treat them as if they were already waiting before the outer callback executed.

---
