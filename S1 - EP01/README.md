# Node.js — Episode 01: Introduction to Node.js

> A beginner-friendly guide to understanding what Node.js is, why it was created, how it works at a high level, and how it evolved.

---

## 📚 Table of Contents

1. [What is Node.js?](#1-what-is-nodejs)
2. [JavaScript and the JavaScript Engine](#2-javascript-and-the-javascript-engine)
3. [What is the V8 Engine?](#3-what-is-the-v8-engine)
4. [Why Do We Need Node.js?](#4-why-do-we-need-nodejs)
5. [Event-Driven Architecture](#6-event-driven-architecture)
6. [Blocking vs Non-Blocking I/O](#7-blocking-vs-non-blocking-io)
7. [Why Non-Blocking I/O Matters](#8-why-non-blocking-io-matters)
8. [A Simple Mental Model](#9-a-simple-mental-model)
9. [History of Node.js](#10-history-of-nodejs)
10. [Node.js and NPM](#11-nodejs-and-npm)
11. [Node.js, io.js and OpenJS Foundation](#12-nodejs-iojs-and-openjs-foundation)
12. [Important Terms](#13-important-terms)
13. [Common Beginner Questions](#14-common-beginner-questions)
14. [Interview Questions](#15-interview-questions)
15. [One-Minute Revision](#16-one-minute-revision)

---

# 1. What is Node.js?

## Simple Definition

**Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.**

The most important part of this definition is:

> **Node.js allows JavaScript to run outside a web browser.**

Traditionally, JavaScript was mainly associated with web browsers.

With Node.js, JavaScript can also be executed outside the browser:

```text
Computer / Server
       ↓
    Node.js
       ↓
   V8 Engine
       ↓
JavaScript Code Executes
```

This makes JavaScript useful not only for browser-based applications, but also for server-side applications and other environments.

### Key Idea

> **Node.js extends the reach of JavaScript beyond the browser.**

This is why Node.js is often associated with the idea:

> **"Run JavaScript Everywhere."**

---

# 2. JavaScript and the JavaScript Engine

A common beginner question is:

### "Can a computer directly understand JavaScript?"

JavaScript needs a **JavaScript engine** to execute the code.

Think of a JavaScript engine as the component responsible for taking JavaScript code and executing it.

```text
JavaScript Code
      ↓
JavaScript Engine
      ↓
Execution
```

Therefore:

> Wherever JavaScript is executed, some JavaScript engine is responsible for executing the code.

## Examples

The study material introduces:

- **SpiderMonkey** — associated with Firefox/Mozilla.
- **V8** — the engine used by Chrome and the engine on which Node.js is built.

---

# 3. What is the V8 Engine?

**V8 is Google's JavaScript engine.**

Node.js is built on top of the V8 JavaScript engine.

A simplified relationship is:

```text
                 Node.js
                    │
                    ▼
              ┌───────────┐
              │ V8 Engine │
              └───────────┘
                    │
                    ▼
             JavaScript Code
```

## Why is this important?

When you write:

```javascript
console.log("Hello Node.js");
```

Node.js provides the runtime environment, while the V8 engine is responsible for executing the JavaScript.

### Remember

**Node.js ≠ V8**

They are related, but they are not the same thing.

| Technology | What it is                     |
| ---------- | ------------------------------ |
| JavaScript | Programming language           |
| V8         | JavaScript engine              |
| Node.js    | JavaScript runtime built on V8 |

---

# 4. Why Do We Need Node.js?

Before Node.js, JavaScript was primarily used in the browser.

Node.js made it possible to use JavaScript outside the browser.

This opened the door to using JavaScript for applications running on servers and other environments.

## Browser vs Node.js

| Browser JavaScript                       | Node.js                                  |
| ---------------------------------------- | ---------------------------------------- |
| Runs inside a browser environment        | Runs outside the browser                 |
| Commonly used for web interfaces         | Can be used for server-side applications |
| Uses a browser's JavaScript engine       | Uses the V8 engine                       |
| Browser provides the runtime environment | Node.js provides the runtime environment |

### Simple Example

A browser can execute:

```javascript
console.log("Hello from the browser");
```

Node.js can also execute:

```javascript
console.log("Hello from Node.js");
```

The major difference is **where the JavaScript is being executed and what runtime environment is providing the surrounding capabilities**.

---

## Mental Model

```text
                 JavaScript
                     │
                     ▼
               ┌───────────┐
               │  Node.js  │
               │  Runtime  │
               └───────────┘
                     │
                     ▼
                V8 Engine
                     │
                     ▼
                 Execution
```

# 5. Event-Driven Architecture

Node.js uses an **event-driven architecture**.

At a high level, this means Node.js can respond to events and asynchronous operations rather than requiring every operation to finish before the program can continue.

For example, imagine a server receiving requests:

```text
Request 1 ──┐
Request 2 ──┼──► Node.js
Request 3 ──┘
```

Node.js is designed to efficiently handle these kinds of operations using its event-driven architecture.

## Simple Idea

Instead of thinking:

```text
Do Task A
   ↓
Wait
   ↓
Do Task B
   ↓
Wait
   ↓
Do Task C
```

the Node.js model supports handling operations asynchronously:

```text
Start Task A
Start Task B
Start Task C

When something is ready:
    respond to that event
```

> **Event-driven architecture is one of the important architectural characteristics of Node.js.**

A deeper explanation of asynchronous I/O and the event-driven model is covered later in the course material.

---

# 6. Blocking vs Non-Blocking I/O

This is one of the most important concepts introduced in this episode.

## What is I/O?

**I/O = Input/Output**

Examples include operations such as:

- Reading data
- Writing data
- Communicating with another system
- Handling network operations

The important question is:

> **Does the program have to wait for an I/O operation to finish before continuing?**

---

## 6.1 Blocking I/O

In a blocking approach:

```text
Start Operation A
       ↓
Wait for A
       ↓
A finishes
       ↓
Start Operation B
       ↓
Wait for B
       ↓
B finishes
```

The next operation waits for the current operation to complete.

This can become inefficient when many requests need to be handled.

---

## 6.2 Non-Blocking I/O

Node.js uses a **non-blocking I/O model**.

Conceptually:

```text
Start Operation A
       ↓
Continue working
       ↓
Start Operation B
       ↓
Continue working
       ↓
Operation A completes
       ↓
Handle the result
```

The program does not need to remain stuck waiting for an I/O operation to finish.

### Important

Non-blocking does **not** mean:

> "The operation happens instantly."

It means:

> **The program can continue working instead of unnecessarily waiting for the I/O operation to finish.**

---

# 7. Why Non-Blocking I/O Matters

The material compares Node.js with traditional server approaches such as the Apache HTTP Server.

The key distinction presented is:

```text
Traditional blocking approach
        ↓
Request waits for operation
        ↓
Resources remain occupied
```

versus:

```text
Node.js non-blocking approach
        ↓
I/O operation is started
        ↓
Program can continue handling other work
        ↓
Result is handled when available
```

## Main Advantages

The non-blocking model can help Node.js:

- Handle multiple requests efficiently.
- Work with a smaller number of threads.
- Reduce resource overhead.
- Support applications that need to deal with many concurrent I/O operations.

## Real-World Analogy

Imagine a waiter in a restaurant.

### Blocking Waiter

```text
Take Order 1
    ↓
Stand in kitchen waiting
    ↓
Order 1 ready
    ↓
Deliver Order 1
    ↓
Take Order 2
```

The waiter is wasting time waiting.

### Non-Blocking Waiter

```text
Take Order 1
    ↓
Send it to kitchen
    ↓
Take Order 2
    ↓
Take Order 3
    ↓
Deliver Order 1 when ready
```

The waiter can continue serving other customers while the kitchen works.

This is a simplified analogy for understanding why non-blocking I/O can improve resource utilization.

> **Important:** This analogy is only a learning model. Real Node.js execution involves its event-driven architecture and asynchronous I/O mechanisms.

---

# 8. A Simple Mental Model

You can remember Node.js using this chain:

```text
JavaScript
    │
    ▼
Node.js Runtime
    │
    ▼
V8 JavaScript Engine
    │
    ▼
Execute JavaScript outside the browser
    │
    ▼
Event-Driven Architecture
    │
    ▼
Asynchronous / Non-Blocking I/O
    │
    ▼
Efficient handling of multiple I/O operations
```

If you understand this chain, you understand the central idea of Episode 01.

---

# 9. History of Node.js

Understanding the history helps explain **why Node.js exists in its current form**.

## Node.js History Timeline

```text
2009
 │
 ├── Node.js created
 │
 ▼
2010
 │
 ├── NPM introduced
 │
 ▼
2011
 │
 ├── Windows support added
 │
 ▼
2012
 │
 ├── Isaac Z. Schlueter began maintaining Node.js
 │
 ▼
2014
 │
 ├── io.js fork created
 │
 ▼
2015
 │
 ├── Node.js and io.js merged
 │
 └── Node.js Foundation formed
 │
 ▼
2019
 │
 └── JS Foundation + Node.js Foundation
       ↓
   OpenJS Foundation
```

---

## 10.1 2009 — Node.js Was Created

Node.js was created in **2009** by **Ryan Dahl**.

The material explains that Ryan initially experimented with the **SpiderMonkey JavaScript engine**, associated with Firefox.

He later moved to the **V8 engine**.

### Important Sequence

```text
Ryan Dahl
   ↓
Started experimenting with SpiderMonkey
   ↓
Tried V8
   ↓
Adopted V8
   ↓
Node.js
```

---

## 10.2 Joyent

Ryan initially worked independently.

The company **Joyent** later supported the project and funded its development.

This support played an important role in the early development of Node.js.

---

## 10.3 The Original Name — Web.js

The material explains that the earlier name of Node.js was:

> **Web.js**

It was later renamed to:

> **Node.js**

The reason given is that the project was intended to be useful for more than just web servers.

---

## 10.4 2010 — NPM Was Introduced

In **2010**, **NPM (Node Package Manager)** was introduced.

NPM became an important part of the Node.js ecosystem.

It allows developers to install and manage packages/libraries for Node.js projects.

---

## 10.5 2011 — Windows Support

Initially, Node.js was built for:

- macOS
- Linux

In **2011**, support for **Microsoft Windows** was added.

This expanded the platforms on which Node.js could be used.

---

## 10.6 2012 — New Maintainer

In **2012**, **Isaac Z. Schlueter** began maintaining Node.js.

He is also identified in the material as the creator of NPM.

---

## 10.7 2014 — io.js

In **2014**, a developer named **Fedor** created a fork of Node.js called:

> **io.js**

The fork resulted from disagreements within the Node.js project.

A separate group of developers began maintaining io.js.

### What Does "Fork" Mean?

A **fork** is a separate project created from an existing project's codebase.

```text
             Node.js
                │
                │ fork
                ▼
              io.js
```

---

## 10.8 2015 — Node.js + io.js

In **September 2015**, Node.js and io.js were merged.

The combined project became associated with the:

> **Node.js Foundation**

The important idea is that the two separate development paths came back together.

```text
Node.js ──────┐
              ├──► Merge ──► Node.js Foundation
io.js ────────┘
```

---

## 10.9 2019 — OpenJS Foundation

In **2019**, the:

- JS Foundation
- Node.js Foundation

merged to form the:

> **OpenJS Foundation**

The OpenJS Foundation maintains Node.js.

This represents the project's transition toward long-term, community-driven development.

---

# 11. Node.js and NPM

## What is NPM?

**NPM = Node Package Manager**

NPM is a package manager for Node.js.

A package manager helps developers install and manage reusable packages/libraries.

## Why Is This Important?

Imagine you need functionality that another developer has already built.

Instead of creating everything from scratch, you can use a package.

```text
Your Project
     │
     ├── Your Code
     │
     ├── Package A
     │
     ├── Package B
     │
     └── Package C
```

NPM makes managing these packages much easier.

## Why NPM Was Important to Node.js

The material emphasizes that NPM played a critical role in the success of Node.js.

The Node.js ecosystem became much more useful because developers could share and reuse packages.

---

# 12. Node.js, io.js and OpenJS Foundation

This entire evolution can be remembered visually:

```text
                    2009
                     │
                     ▼
              Node.js created
                     │
                     ▼
                    2010
                     │
                     ▼
                NPM introduced
                     │
                     ▼
                    2011
                     │
                     ▼
              Windows support
                     │
                     ▼
                    2012
                     │
                     ▼
          Isaac Z. Schlueter maintains
                 Node.js
                     │
                     ▼
                    2014
                     │
                     ▼
                io.js fork
                     │
                     ▼
                    2015
                     │
                     ▼
             Node.js + io.js
                  merged
                     │
                     ▼
             Node.js Foundation
                     │
                     ▼
                    2019
                     │
                     ▼
       JS Foundation + Node.js Foundation
                     │
                     ▼
            OpenJS Foundation
```

## The Big Picture

Node.js evolved from an individual project into a large open-source ecosystem supported by a foundation and community.

---

# 13. Important Terms

| Term                  | Simple Meaning                                                                |
| --------------------- | ----------------------------------------------------------------------------- |
| **Node.js**           | JavaScript runtime that allows JavaScript to run outside the browser          |
| **Runtime**           | Environment in which a program executes                                       |
| **V8**                | JavaScript engine used by Node.js                                             |
| **JavaScript Engine** | Software responsible for executing JavaScript                                 |
| **SpiderMonkey**      | JavaScript engine associated with Firefox/Mozilla                             |
| **Event-Driven**      | Architecture centered around responding to events and asynchronous operations |
| **I/O**               | Input/Output operations                                                       |
| **Blocking I/O**      | Execution waits for an I/O operation                                          |
| **Non-Blocking I/O**  | Execution can continue while an I/O operation is being handled                |
| **NPM**               | Node Package Manager                                                          |
| **Package**           | Reusable code/library that can be used by a project                           |
| **Fork**              | A separate project created from an existing project's codebase                |
| **io.js**             | A fork of Node.js created in 2014                                             |
| **OpenJS Foundation** | Foundation that maintains Node.js                                             |

---

# 14. Common Beginner Questions

## Q1. Is Node.js a programming language?

**No.**

Node.js is a **runtime environment** for executing JavaScript.

```text
JavaScript → Programming Language
Node.js    → Runtime Environment
V8         → JavaScript Engine
```

---

## Q2. Is Node.js a JavaScript engine?

**No.**

Node.js is built on the **V8 JavaScript engine**.

```text
Node.js
   ↓
uses
   ↓
V8
```

---

## Q3. Can JavaScript run without a browser?

**Yes.**

Node.js allows JavaScript to run outside the browser.

---

## Q4. Why is V8 important to Node.js?

V8 is the JavaScript engine on which Node.js is built.

It provides the JavaScript execution engine used by Node.js.

---

## Q5. What does non-blocking I/O mean?

It means the program does not have to remain stuck waiting for an I/O operation to finish before continuing with other work.

---

## Q6. Does non-blocking mean that everything happens immediately?

**No.**

Non-blocking means that the program can continue working instead of unnecessarily waiting for an I/O operation to complete.

---

## Q7. What is NPM?

NPM stands for **Node Package Manager**.

It is used to install and manage packages for Node.js projects.

---

## Q8. What was Node.js originally called?

The material states that the earlier name was:

**Web.js**

It was later renamed to **Node.js** because the project was intended for more than just web servers.

---

## Q9. What is io.js?

io.js was a **fork of Node.js** created in 2014.

Node.js and io.js were later merged in 2015.

---

## Q10. Who maintains Node.js?

The material states that Node.js is maintained by the **OpenJS Foundation**.

---

# 15. Interview Questions

## Beginner Level

1. What is Node.js?
2. Is Node.js a programming language?
3. Is Node.js a runtime or a JavaScript engine?
4. What JavaScript engine does Node.js use?
5. What is V8?
6. Why was Node.js created?
7. Can JavaScript run outside a browser?
8. What is event-driven architecture?
9. What is I/O?
10. What is blocking I/O?
11. What is non-blocking I/O?
12. What is NPM?
13. What does NPM stand for?
14. What is a package manager?
15. What is a fork?
16. What was io.js?
17. When were Node.js and io.js merged?
18. What is the OpenJS Foundation?

---

## Conceptual Questions

### Q1. Why is Node.js considered efficient for handling multiple I/O operations?

**Answer:**

Node.js uses an event-driven architecture and non-blocking I/O.

This allows the application to continue working instead of waiting unnecessarily for I/O operations to finish.

---

### Q2. What is the relationship between Node.js and V8?

**Answer:**

```text
Node.js = JavaScript Runtime
V8      = JavaScript Engine
```

Node.js is built on the V8 engine.

---

### Q3. Why is non-blocking I/O useful?

**Answer:**

Because the application can continue handling other work while an I/O operation is in progress.

This can improve resource utilization and help handle multiple requests efficiently.

---

# 16. One-Minute Revision

If you have only one minute before an interview or revision session, remember this:

> **Node.js is a JavaScript runtime built on Google's V8 JavaScript engine. It allows JavaScript to run outside the browser. Node.js uses an event-driven architecture and supports asynchronous, non-blocking I/O, which allows it to efficiently handle multiple I/O operations.**

## History

```text
2009 → Node.js created
2010 → NPM introduced
2011 → Windows support
2012 → Isaac Z. Schlueter maintains Node.js
2014 → io.js fork
2015 → Node.js + io.js merged
2019 → OpenJS Foundation formed
```

## Three Things You MUST Remember

```text
1. Node.js = JavaScript Runtime

2. V8 = JavaScript Engine

3. Node.js = Event-Driven + Non-Blocking I/O
```

---
