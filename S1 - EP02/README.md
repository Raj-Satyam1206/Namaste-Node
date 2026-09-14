# Node.js — Episode 02: JavaScript on the Server

> This chapter explains how JavaScript moved from the browser to the server, what a server actually is, how Node.js uses V8, and how JavaScript is converted into instructions that the CPU can execute.

---

## 📚 Table of Contents

1. [JavaScript on the Server](#1-javascript-on-the-server)
2. [What is a Server?](#2-what-is-a-server)
3. [Client, Server, IP Address and HTTP](#3-client-server-ip-address-and-http)
4. [How Node.js Runs JavaScript](#4-how-nodejs-runs-javascript)
5. [What is V8?](#5-what-is-v8)
6. [V8 vs Node.js](#6-v8-vs-nodejs)
7. [From JavaScript to Machine Code](#7-from-javascript-to-machine-code)
8. [High-Level vs Low-Level Code](#8-high-level-vs-low-level-code)
9. [Why Node.js is Useful for Servers](#9-why-nodejs-is-useful-for-servers)
10. [Quick Revision](#10-quick-revision)
11. [Interview Questions](#11-interview-questions)

---

# 1. JavaScript on the Server

Traditionally, JavaScript was mainly associated with the **browser**.

For example:

```text
User
  ↓
Browser
  ↓
JavaScript
  ↓
User Interface
```

JavaScript can also run on a **server** using Node.js:

```text
User
  ↓
Browser
  ↓
HTTP Request
  ↓
Node.js Server
  ↓
Application Logic
  ↓
Database / APIs / Files
  ↓
HTTP Response
  ↓
Browser
```

This means the same programming language can be used for both:

- **Frontend** → JavaScript running in the browser
- **Backend** → JavaScript running on the server through Node.js

### Important

Node.js did not create a new version of JavaScript.

It provides a **runtime environment** that allows JavaScript to execute outside the browser.

---

# 2. What is a Server?

A **server is a computer or system that provides data, resources, or services to other computers called clients over a network.**

A simple way to think about it:

> **A server is a computer that waits for requests and provides appropriate responses or services.**

For example, when you open a website:

```text
Your Computer
     │
     │ Request
     ▼
Web Server
     │
     │ Response
     ▼
Your Computer
```

The server may perform tasks such as:

- Processing requests
- Running application/business logic
- Reading or writing data
- Communicating with databases
- Calling external APIs
- Returning HTML, JSON, files, or other data

### Example

Suppose you request:

```text
GET /users
```

A Node.js server may:

```text
Receive request
      ↓
Run application logic
      ↓
Query database
      ↓
Prepare response
      ↓
Send JSON to client
```

---

# 3. Client, Server, IP Address and HTTP

These four terms are fundamental to backend development.

## 3.1 Client

A **client** is a program or device that requests a service or resource.

Examples:

- Web browser
- Mobile application
- Another server
- API client

---

## 3.2 Server

A **server** receives requests and provides services or resources.

```text
Client  ─────── Request ───────► Server
Client  ◄────── Response ─────── Server
```

---

## 3.3 IP Address

**IP = Internet Protocol**

An IP address identifies a device/interface on a network so that network traffic can be routed to it.

Example IPv4 address:

```text
192.168.1.10
```

You can think of it as a network address.

> An IP address identifies a network endpoint; it is not the same thing as a domain name.

For example:

```text
google.com
     ↓
DNS
     ↓
IP Address
     ↓
Server
```

DNS translates domain names into IP addresses so clients can locate network services.

---

## 3.4 HTTP

**HTTP = HyperText Transfer Protocol**

HTTP is one of the main protocols used for communication between web clients and servers.

A simplified request/response cycle:

```text
Client
  │
  │ HTTP Request
  ▼
Server
  │
  │ HTTP Response
  ▼
Client
```

Example:

```http
GET /users
```

The server might respond with:

```json
[
  {
    "id": 1,
    "name": "Satyam"
  }
]
```

Node.js provides the APIs required to create HTTP servers and handle these requests.

---

# 4. How Node.js Runs JavaScript

To understand Node.js properly, separate these three concepts:

```text
JavaScript
    ↓
V8
    ↓
Node.js
```

More accurately:

```text
             Node.js
        ┌─────────────────┐
        │ Node APIs       │
        │ Networking      │
        │ File System     │
        │ Process APIs    │
        │ Other Runtime   │
        │ Capabilities    │
        ├─────────────────┤
        │ V8 Engine       │
        └─────────────────┘
```

### JavaScript

The programming language we write:

```javascript
console.log("Hello");
```

### V8

The JavaScript engine that parses, executes and optimizes JavaScript.

### Node.js

The runtime that embeds V8 and provides additional capabilities needed for server-side programming.

---

# 5. What is V8?

**V8 is Google's open-source, high-performance JavaScript and WebAssembly engine written in C++.**

It is used by:

- Google Chrome
- Node.js
- Other applications that embed V8

V8 implements the **ECMAScript** language specification and also supports **WebAssembly**.

### Simple Definition

> **V8 is the engine that executes JavaScript.**

---

## 5.1 V8 is Written in C++

The V8 engine itself is implemented in **C++**.

This does NOT mean:

```text
You write JavaScript
      ↓
You must learn C++
```

You can write:

```javascript
const result = 10 + 20;

console.log(result);
```

V8 handles the complex work of executing that JavaScript.

Conceptually:

```text
Your JavaScript
      ↓
      V8
      ↓
Machine-level instructions
      ↓
CPU
```

---

## 5.2 V8 Can Be Embedded

One important property of V8 is that it can be embedded into a C++ application.

This is exactly the idea behind Node.js:

```text
        Node.js
     C++ Application
            │
            ▼
        V8 Engine
            │
            ▼
     Executes JavaScript
```

This is why the statement:

> **"Node.js is a C++ application with V8 embedded into it"**

is useful as a simplified mental model.

Node.js itself is more than just V8; it adds its own runtime APIs and infrastructure around the engine.

---

# 6. V8 vs Node.js

This is one of the most important distinctions in Node.js.

| V8                                                 | Node.js                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| JavaScript engine                                  | JavaScript runtime                                           |
| Written in C++                                     | Built primarily in C++ and uses V8                           |
| Executes JavaScript                                | Provides an environment for server-side JavaScript           |
| Implements ECMAScript                              | Uses V8 + Node.js APIs/runtime facilities                    |
| Handles JavaScript execution and memory management | Adds capabilities such as networking, files, processes, etc. |
| Can be embedded into C++ applications              | Uses V8 as one of its core components                        |

### Example

V8 understands JavaScript:

```javascript
const a = 10;
const b = 20;

console.log(a + b);
```

But server applications also need capabilities such as:

```text
File System
Networking
HTTP
Processes
Environment Variables
Streams
Timers
```

Node.js provides these runtime capabilities through its APIs.

Therefore:

> **V8 executes JavaScript; Node.js provides the broader runtime environment.**

---

# 7. From JavaScript to Machine Code

Your CPU ultimately executes **machine instructions**.

But developers normally write code using high-level languages such as JavaScript.

So there has to be a process that takes JavaScript and makes it executable by the computer.

A simplified view is:

```text
JavaScript
    ↓
Parsing
    ↓
AST
    ↓
Bytecode / Intermediate representations
    ↓
Optimization
    ↓
Machine Code
    ↓
CPU
```

The actual V8 implementation is more sophisticated than this simplified diagram.

---

## 7.1 Step 1 — Parsing

V8 first reads the JavaScript source code.

Example:

```javascript
const x = 10 + 20;
```

V8 analyzes the syntax and builds an internal representation of the program.

One important representation is an:

> **AST — Abstract Syntax Tree**

An AST represents the structure and meaning of the source code.

Simplified:

```text
const x = 10 + 20

        =
       /       x   +
         /        10  20
```

You do not normally see this tree as a JavaScript developer. V8 uses internal representations like this to understand the program.

---

## 7.2 Step 2 — Execution and Bytecode

Modern V8 does not simply follow the old idea of:

```text
JavaScript → machine code
```

V8 uses an interpreter/compiler pipeline.

A simplified model is:

```text
JavaScript
    ↓
Parser
    ↓
AST
    ↓
Ignition
    ↓
Bytecode
    ↓
Execution
```

**Ignition** is V8's interpreter.

It generates and executes bytecode for JavaScript.

---

## 7.3 Step 3 — Optimization

While JavaScript is running, V8 can observe how the code behaves.

If certain code becomes "hot" — meaning it is executed frequently — V8 can optimize it.

Conceptually:

```text
JavaScript
    ↓
Bytecode
    ↓
Run code
    ↓
Observe runtime behavior
    ↓
Frequently executed code
    ↓
Optimization
    ↓
Optimized machine code
```

V8 uses optimizing compiler technology such as **TurboFan** for optimization.

This is one reason V8 can execute JavaScript efficiently.

---

## 7.4 JIT Compilation

This approach is commonly described as:

> **JIT = Just-In-Time compilation**

The basic idea is that compilation and optimization can happen while the program is running.

Instead of requiring all JavaScript to be fully compiled ahead of time:

```text
Compile everything
      ↓
Run program
```

V8 can use runtime information:

```text
Run
 ↓
Observe
 ↓
Optimize
 ↓
Run optimized code
```

### Important

Do not memorize:

> "JavaScript is just an interpreted language."

That is an oversimplification.

Modern JavaScript engines such as V8 use a combination of **parsing, interpretation, compilation and runtime optimization**.

---

# 8. High-Level vs Low-Level Code

## 8.1 High-Level Code

JavaScript is a **high-level programming language**.

Example:

```javascript
const price = 100;
const tax = 18;

const total = price + tax;

console.log(total);
```

This code is relatively easy for humans to read and write.

---

## 8.2 Low-Level Code

Low-level code is closer to the hardware and machine architecture.

Two important categories are:

### Machine Language

Machine language consists of instructions represented as binary values.

Conceptually:

```text
01001010
10110001
11000100
```

The CPU executes machine instructions.

### Assembly Language

Assembly language uses human-readable mnemonics that correspond closely to machine instructions.

Conceptually:

```text
MOV
ADD
SUB
JMP
```

Assembly is easier for humans to read than raw binary, but it is still closely tied to a specific processor architecture.

---

## High-Level to Low-Level

The overall idea is:

```text
High-Level JavaScript
        ↓
      V8
        ↓
Internal representations
        ↓
Optimized machine code
        ↓
       CPU
```

You write the high-level code.

V8 handles the complex execution and optimization process.

---

# 9. Why Node.js is Useful for Servers

Node.js combines:

```text
JavaScript
    +
V8
    +
Node.js Runtime APIs
    +
Event-Driven Architecture
    +
Non-Blocking I/O
```

This makes Node.js particularly useful for applications that perform a lot of network and I/O work.

Examples include:

- REST APIs
- Web servers
- Real-time applications
- Chat applications
- Streaming applications
- Backend services
- Microservices

### Why?

Node.js is designed as an asynchronous, event-driven runtime.

For example:

```text
Request A ──┐
Request B ──┼──► Node.js
Request C ──┘
                │
                ▼
          Handle I/O
                │
                ▼
        Send responses
```

Node.js can handle many concurrent connections efficiently without requiring a dedicated OS thread for every connection.

> This does **not** mean Node.js has no threads at all. The runtime and operating system may use threads internally for various tasks. The important idea is that Node.js does not require one application thread per client request.

---

## The Most Important Diagram

```text
                    JavaScript
                        │
                        ▼
                  ┌───────────┐
                  │   Node.js │
                  │  Runtime  │
                  ├───────────┤
                  │ Node APIs │
                  │ HTTP      │
                  │ FS        │
                  │ Networking│
                  │ Processes │
                  ├───────────┤
                  │    V8     │
                  │  Engine   │
                  └───────────┘
                        │
                        ▼
                 Machine Code
                        │
                        ▼
                       CPU
```

---

## Key Terms

| Term                   | Meaning                                                    |
| ---------------------- | ---------------------------------------------------------- |
| **Client**             | Program/device that requests a service                     |
| **Server**             | System that provides services/resources to clients         |
| **IP Address**         | Network address used to identify a network endpoint        |
| **HTTP**               | Protocol commonly used for web client-server communication |
| **Node.js**            | JavaScript runtime built on V8                             |
| **V8**                 | Google's JavaScript/WebAssembly engine                     |
| **ECMAScript**         | Standard that specifies the JavaScript language            |
| **AST**                | Abstract Syntax Tree representing program structure        |
| **Bytecode**           | Intermediate instructions executed by an interpreter       |
| **JIT**                | Just-In-Time compilation/optimization during runtime       |
| **Machine Code**       | Instructions executable by the CPU                         |
| **Assembly**           | Low-level symbolic representation of machine instructions  |
| **Garbage Collection** | Automatic reclamation of memory that is no longer needed   |

---

# 11. Interview Questions

### 1. What is Node.js?

Node.js is a JavaScript runtime built on the V8 JavaScript engine that allows JavaScript to run outside the browser.

### 2. What is V8?

V8 is Google's open-source JavaScript and WebAssembly engine written in C++. It is used by Chrome and Node.js.

### 3. What is the difference between V8 and Node.js?

**V8 executes JavaScript. Node.js provides the runtime environment and additional APIs needed to build applications outside the browser.**

### 4. Why can't V8 alone provide all Node.js functionality?

V8 is a JavaScript engine. It provides JavaScript execution and language/runtime mechanisms, but capabilities such as Node's filesystem, networking, HTTP and process APIs are provided by the Node.js runtime.

### 5. What is ECMAScript?

ECMAScript is the standardized specification that defines the JavaScript language.

### 6. What is an AST?

An **Abstract Syntax Tree** is a structured representation of source code created after parsing. It represents the relationships between parts of the program.

### 7. What is JIT compilation?

JIT means **Just-In-Time compilation**. Code can be compiled and optimized during program execution using information available at runtime.

### 8. What is machine code?

Machine code consists of low-level instructions that a CPU can execute directly.

### 9. Is JavaScript purely interpreted?

**No.**

That is an outdated oversimplification. Modern engines such as V8 use a combination of interpretation, compilation and runtime optimization.

### 10. Does Node.js create one thread for every request?

**No.**

Node.js is designed around an event-driven architecture and does not require one application thread per request. Internal runtime and OS mechanisms can still use threads for specific work.

---
