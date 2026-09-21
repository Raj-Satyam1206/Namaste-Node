# Episode 11 — Creating a Server

![Node.js](https://img.shields.io/badge/Node.js-HTTP%20Server-green?logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-Server--Side-yellow?logo=javascript)
![HTTP](https://img.shields.io/badge/HTTP-Client%20%7C%20Server-blue)
![Episode](https://img.shields.io/badge/Episode-11-orange)

> A detailed set of notes on **servers, client-server architecture, sockets, TCP/IP, protocols, packets, DNS, ports, URL routing, distributed server architecture, Socket vs WebSocket, creating an HTTP server with Node.js, handling routes, and Express**.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Learning Objectives](#-learning-objectives)
- [What is a Server?](#-what-is-a-server)
- [Server: Hardware vs Software](#-server-hardware-vs-software)
- [Deploying an Application on a Server](#-deploying-an-application-on-a-server)
- [AWS and Cloud Computing](#-aws-and-cloud-computing)
- [Can a Laptop Be Used as a Server?](#-can-a-laptop-be-used-as-a-server)
- [Software Servers in Node.js](#-software-servers-in-nodejs)
- [Client-Server Architecture](#-client-server-architecture)
- [Sockets](#-sockets)
- [TCP/IP](#-tcpip)
- [What is a Protocol?](#-what-is-a-protocol)
- [HTTP, FTP and SMTP](#-http-ftp-and-smtp)
- [How is Data Sent Over a Network?](#-how-is-data-sent-over-a-network)
- [Streams and Buffers](#-streams-and-buffers)
- [DNS](#-dns)
- [Domain Name to IP Address](#-domain-name-to-ip-address)
- [IP Address + Port](#-ip-address--port)
- [Can Multiple Servers Run on One Machine?](#-can-multiple-servers-run-on-one-machine)
- [Mapping Domain Names, Ports and Paths](#-mapping-domain-names-ports-and-paths)
- [Distributed Server Architecture](#-distributed-server-architecture)
- [Frontend Server](#-frontend-server)
- [Backend Server](#-backend-server)
- [Database Server](#-database-server)
- [Media and File Servers](#-media-and-file-servers)
- [Inter-Server Communication](#-inter-server-communication)
- [Socket vs WebSocket](#-socket-vs-websocket)
- [Creating a Server with Node.js](#-creating-a-server-with-nodejs)
- [Handling Different URLs](#-handling-different-urls)
- [Express](#-express)

---

# 🧐 Overview

Episode 11 introduces the practical idea of **creating and understanding a server**.

The episode begins with a fundamental question:

> **What is a server?**

The material explains that the word **server** can refer to either:

1. **Hardware** — a physical machine that provides resources and services to clients.
2. **Software** — an application that receives requests and delivers data or responses to clients. fileciteturn4file1L3-L10

From there, the episode builds a complete conceptual path:

```text
Server
  ↓
Client-Server Architecture
  ↓
Socket
  ↓
TCP/IP
  ↓
Packets
  ↓
DNS
  ↓
IP Address
  ↓
Port
  ↓
Application
  ↓
HTTP Server
  ↓
Node.js
  ↓
Express
```

The supplied PDF also expands the topic into distributed architectures involving frontend servers, backend servers, databases, file/media servers, and CDNs. fileciteturn4file0L167-L216

---

# 🎯 Learning Objectives

After completing this episode, you should be able to explain:

- What a server is
- The difference between server hardware and server software
- What it means to deploy an application on a server
- The role of the operating system
- What a client is
- How client-server communication works
- What a socket is
- What TCP/IP is
- What a protocol is
- What HTTP, FTP and SMTP are
- How data is transmitted as packets
- Why streams and buffers matter
- What DNS does
- How a domain name maps to an IP address
- What a port is
- How multiple applications can run on one server
- How IP + port identifies an application endpoint
- How URL paths can be mapped to different applications
- What distributed server architecture means
- The role of frontend, backend, database and media servers
- What inter-server communication is
- The difference between a normal socket connection and WebSocket
- How to create an HTTP server using Node.js
- How to handle different request URLs
- Why Express is commonly used on top of Node.js

---

# 🖥️ What is a Server?

The term **server** can have two meanings depending on context.

### Hardware Server

A hardware server is a physical computer that provides resources and services to other computers over a network.

It has resources such as:

```text
CPU
RAM
Storage
Network Interface
```

### Software Server

A software server is an application/program that:

```text
Receives Request
      ↓
Processes Request
      ↓
Produces Response
      ↓
Sends Data to Client
```

The accompanying README explicitly defines hardware as a physical machine providing resources/services and software as an application that handles requests and delivers data. fileciteturn4file1L6-L10

---

# 🏗️ Server: Hardware vs Software

It is important not to confuse these two meanings.

| Term                 | Meaning                                                |
| -------------------- | ------------------------------------------------------ |
| **Server Hardware**  | Physical machine providing computing/network resources |
| **Server Software**  | Program listening for and processing requests          |
| **Client**           | System/application making a request                    |
| **Operating System** | Software layer on which applications run               |

A simplified architecture is:

```text
┌─────────────────────────────┐
│       Server Hardware       │
│                             │
│ CPU | RAM | Storage | NIC   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Operating System       │
│       Linux / Windows       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Server Software       │
│   Node.js / Apache / etc.   │
└──────────────┬──────────────┘
               │
               ▼
             Client
```

---

# 🚀 Deploying an Application on a Server

When someone says:

> **"Deploy your application on a server."**

the episode breaks this into three aspects:

### 1. Hardware

A physical or virtual machine provides:

```text
CPU
RAM
Storage
Network
```

### 2. Operating System

The server runs an operating system such as:

```text
Linux
Windows
```

Your application runs on top of that operating system.

### 3. Server Software

A server application receives and handles client requests.

Examples mentioned in the source include:

```text
Apache
Node.js application server
```

The accompanying README explicitly presents these three layers: hardware, operating system, and server software. fileciteturn4file1L12-L20

---

# ☁️ AWS and Cloud Computing

The Episode-11 PDF introduces AWS as a cloud provider that supplies cloud-based resources, including servers.

## EC2

An **EC2 instance** is presented as a virtual server rented from AWS.

Conceptually:

```text
AWS
 │
 └── EC2 Instance
        │
        ├── CPU
        ├── RAM
        ├── Storage
        ├── Operating System
        └── Your Application
```

The source explains that AWS manages the underlying hardware while you deploy your application on the virtual server. fileciteturn4file0L28-L33

### Scalability

The episode highlights the ability to adjust resources such as:

```text
Memory
Processing Power
```

more easily in a cloud environment than on a personal laptop or desktop. fileciteturn4file0L34-L36

### Reliability

The source also highlights infrastructure such as:

- Constant power
- Internet backup
- Redundant systems
- High availability

as advantages of cloud/server infrastructure. fileciteturn4file0L37-L39

---

# 💻 Can a Laptop Be Used as a Server?

Yes.

The source explicitly answers:

> **Yes, but with limitations.** fileciteturn4file0L40-L48

A laptop can run server software and accept network requests.

For example:

```text
Your Laptop
    │
    ├── Node.js
    │
    └── HTTP Server
```

However, there are practical limitations.

## Hardware Constraints

A laptop may have limited:

```text
RAM
CPU
Storage
```

which may not be sufficient for large workloads. fileciteturn4file0L42-L45

## Internet Connectivity

Home internet may have:

- Less reliable connectivity
- Dynamic IP addresses

which makes publicly accessible hosting less suitable. fileciteturn4file0L46-L48

## Power and Maintenance

A laptop needs to remain:

```text
Powered On
Connected to Internet
Available continuously
```

Backup power and maintenance can also become concerns. The source contrasts this with cloud infrastructure such as AWS. fileciteturn4file0L51-L54

---

# 🟢 Software Servers in Node.js

When you create an HTTP server in Node.js, you are creating **software that listens for client requests and responds to them**.

The source explicitly describes a Node.js HTTP server as an example of a software server. fileciteturn4file0L55-L58

Conceptually:

```text
Client
   │
   │ Request
   ▼
Node.js HTTP Server
   │
   │ Process
   ▼
Response
   │
   ▼
Client
```

---

# 🌐 Client-Server Architecture

The basic model is:

```text
Client
   │
   │ Request
   ▼
Server
   │
   │ Process
   ▼
Response
   │
   ▼
Client
```

A **client** is an application/system accessing a server.

A common client is:

```text
Web Browser
```

The accompanying README explains that the client opens a socket connection, while the server-side application listens for requests, retrieves the requested resource, and sends it back. fileciteturn4file1L22-L28

---

# 🔌 Sockets

A **socket** provides a communication endpoint between the client and server.

Conceptually:

```text
Client
  │
  │ Socket Connection
  ▼
Server
```

Both sides have network addresses.

```text
Client IP
      ↓
Client Socket
      ↓
Network
      ↓
Server Socket
      ↓
Server IP
```

### Important

The episode explicitly distinguishes:

```text
Socket
```

from:

```text
WebSocket
```

They should not be treated as identical concepts.

---

# 🌐 TCP/IP

The source states that sockets operate using the **TCP/IP protocol**:

```text
TCP = Transmission Control Protocol
IP  = Internet Protocol
```

fileciteturn4file0L71-L76

A simplified communication model is:

```text
Client
   │
   │ TCP/IP
   ▼
Network
   │
   ▼
Server
```

---

# 📜 What is a Protocol?

A **protocol** is a set of rules that defines how computers communicate.

Protocols determine things such as:

- How data is structured
- How data is transmitted
- How communicating systems interpret the exchanged information

The source explicitly defines a protocol as a set of rules determining how computers communicate and the format in which data is sent. fileciteturn4file0L80-L87

---

# 📡 HTTP, FTP and SMTP

The Episode-11 material introduces several protocols.

| Protocol | Full Form                     | Purpose           |
| -------- | ----------------------------- | ----------------- |
| **HTTP** | HyperText Transfer Protocol   | Web communication |
| **FTP**  | File Transfer Protocol        | File transfer     |
| **SMTP** | Simple Mail Transfer Protocol | Sending email     |

The source explicitly identifies FTP for transferring files and SMTP for sending emails. It presents HTTP as the protocol/rules used for communication between web clients and servers. fileciteturn4file0L81-L89

---

# 🌍 HTTP Server

When we talk about a typical web server, we often mean an:

```text
HTTP Server
```

Its basic job is:

```text
Receive HTTP Request
        ↓
Process Request
        ↓
Send HTTP Response
```

For a Node.js application:

```text
Browser
   │
   │ HTTP Request
   ▼
Node.js HTTP Server
   │
   │ HTTP Response
   ▼
Browser
```

---

# 📦 How is Data Sent Over a Network?

The source asks:

> **When you make a server request, how is data sent?**

The answer given is:

> Data is sent in chunks, and these smaller units are known as **packets**. fileciteturn4file0L90-L97

Conceptually:

```text
Large Data
    ↓
Broken into smaller units
    ↓
Packets
    ↓
Network
    ↓
Destination
    ↓
Data reconstructed/processed
```

The source associates TCP/IP with sending and managing these packets. fileciteturn4file0L92-L97

---

# 🌊 Streams and Buffers

The episode connects network data transmission with two important Node.js concepts:

```text
Streams
Buffers
```

The source states that Node.js uses streams and buffers when handling and writing code related to data transmission. fileciteturn4file0L96-L97

This becomes especially relevant when dealing with:

```text
Videos
Images
Large files
Network data
```

---

# 🔎 DNS

Humans generally use domain names:

```text
youtube.com
```

instead of remembering IP addresses.

The source explains that domain names ultimately map to IP addresses, and this mapping is handled through the **Domain Name System (DNS)**. fileciteturn4file0L103-L110

Conceptually:

```text
youtube.com
     │
     ▼
    DNS
     │
     ▼
IP Address
     │
     ▼
Server
```

---

# 🧭 Domain Name to IP Address

Suppose the browser requests:

```text
youtube.com
```

A simplified process is:

```text
1. User enters:
   youtube.com

2. Browser needs an IP address.

3. DNS resolves:
   youtube.com
       ↓
   IP address

4. Client connects to that server.

5. HTTP server processes the request.

6. Response data is returned.
```

The PDF illustrates this process visually on pages 9–10: the domain name is resolved through DNS, then the client contacts the server. fileciteturn4file0L103-L121

---

# 🌐 DNS Server

A DNS server manages mappings between:

```text
Domain Name
      ↕
IP Address
```

When a browser requests a website:

```text
Browser
   │
   │ "youtube.com"
   ▼
DNS
   │
   │ Resolve
   ▼
IP Address
   │
   ▼
Web Server
```

The source explains that once the IP is resolved, the request can be made to the corresponding server. fileciteturn4file0L112-L120

---

# 📺 Why Do Videos Sometimes Buffer?

The source uses video delivery as an example.

The requested content can be delivered in:

```text
Chunks
   ↓
Streams
   ↓
Buffers
```

If the application cannot receive/process data quickly enough, the client may temporarily run out of buffered data.

The source explicitly connects video data being delivered in chunks with streams and buffers, using buffering as an intuitive example. fileciteturn4file0L118-L121

---

# 🔢 IP Address + Port

An IP address identifies the machine/server.

A **port** helps identify the particular application/service on that machine.

The source gives the example:

```text
102.209.1.3:3000
```

The combination of:

```text
IP Address + Port
```

is used to identify where a particular HTTP server/application is listening. fileciteturn4file0L125-L137

Conceptually:

```text
IP Address
    ↓
Which machine?

Port
    ↓
Which application/service?
```

---

# 🧩 Can Multiple Servers Run on One Machine?

Yes.

The source explicitly asks:

> **Can I create multiple servers?**

Answer:

> **Yes, you can create multiple HTTP servers.** fileciteturn4file0L123-L137

For example:

```text
Same Server Machine
       │
       ├── Port 3000 → Application A
       │
       ├── Port 3001 → Application B
       │
       └── Port 3002 → Application C
```

The port number helps determine which application/service should receive the request.

---

# 🔀 Mapping Domain Names, Ports and Paths

The episode gives the conceptual example:

```text
102.209.1.3:3000
    ↓
React Application

102.209.1.3:3001
    ↓
Node.js Application
```

It then adds URL paths.

For example:

```text
youtube.com
     ↓
React Application

youtube.com/api/...
     ↓
Node.js Application
```

Another example from the source:

```text
namastedev.com
      ↓
React application on port 3000

namastedev.com/node
      ↓
Node.js application on port 3001
```

fileciteturn4file0L149-L166

### Conceptual mapping

```text
Domain
  ↓
DNS
  ↓
IP Address
  ↓
Port
  ↓
Application
  ↓
Path / Route
  ↓
Specific functionality
```

---

# 🏢 Distributed Server Architecture

In large organizations, applications are often distributed across multiple servers rather than putting everything on one machine.

The source describes this as a way to improve:

- Scalability
- Reliability
- Performance
- Separation of concerns
- Resilience

fileciteturn4file0L167-L170

A simplified architecture is:

```text
                    Client
                      │
                      ▼
               Frontend Server
                      │
                      ▼
                Backend Server
                 /     |      \
                /      |       \
               ▼       ▼        ▼
           Database   Files    Media
                         │
                         ▼
                        CDN
```

---

# 🎨 Frontend Server

A frontend server handles the user interface resources.

The source describes it as serving:

```text
HTML
CSS
JavaScript
```

that the browser needs to render the website. fileciteturn4file0L171-L176

Conceptually:

```text
Browser
   ↓
Frontend Server
   ↓
HTML / CSS / JS
   ↓
Rendered UI
```

---

# ⚙️ Backend Server

The backend server handles:

- Application logic
- Requests
- Business operations
- Database interaction

The source states that the backend processes logic, handles requests, and interacts with the database. fileciteturn4file0L177-L182

Conceptually:

```text
Frontend
   │
   │ API Request
   ▼
Backend
   │
   ├── Business Logic
   └── Database
```

---

# 🗄️ Database Server

The database is often hosted separately.

The source describes a dedicated database server as a powerful server optimized for storing and managing data. fileciteturn4file0L183-L187

Flow:

```text
Client
   ↓
Backend
   ↓
Database Server
   ↓
Data
   ↓
Backend
   ↓
Client
```

---

# 🎬 Media and File Servers

Large files such as:

```text
Videos
Images
Other Media
```

may be stored on specialized servers.

The source explains that media servers can be optimized for delivering large amounts of data efficiently. fileciteturn4file0L188-L194

For example:

```text
User
  ↓
Application
  ↓
Media Server
  ↓
Video
```

---

# 🌎 CDN

The source mentions that images may be stored on a different server and can be managed through a **Content Delivery Network (CDN)** to improve delivery speed to users worldwide. fileciteturn4file0L193-L194

Conceptually:

```text
Origin Server
     ↓
    CDN
 ┌───┼───┐
 ▼   ▼   ▼
Edge Edge Edge
```

---

# 🔄 Inter-Server Communication

Servers can communicate with other servers to obtain the data required to fulfill a request.

For example:

```text
Client
   │
   ▼
Backend Server
   │
   │ API call
   ▼
Media Server
   │
   │ Video data
   ▼
Backend / Frontend
   │
   ▼
Client
```

The source gives a video example where one server can make an API call to another server hosting video content and then return the required content to the client. fileciteturn4file0L195-L200

---

# 🏗️ Example: `namastedev.com` Architecture

The source gives this conceptual architecture:

```text
                    ┌─────────────────┐
                    │     Client      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ AWS Web Server  │
                    │                 │
                    │ Frontend        │
                    │ Backend         │
                    └───┬────┬────┬───┘
                        │    │    │
             ┌──────────┘    │    └──────────┐
             ▼               ▼               ▼
      Database Server   Media/File Server   CDN
```

The PDF's visual on page 15 depicts a client communicating with a web server that connects to separate database, file, and image resources. fileciteturn4file0L201-L209

---

# 🔌 Socket vs WebSocket

This is a major distinction in the episode.

## Socket Connection

The source describes a typical website request as:

```text
Client
  ↓
Open Socket
  ↓
Send Request
  ↓
Server Processes
  ↓
Receive Response
  ↓
Connection Closed
```

The accompanying README describes this as a typical single request-response cycle. fileciteturn4file1L41-L44

---

# 🔄 WebSocket

WebSockets keep the connection open.

```text
Client ═════════════════ Server
          Persistent
          Connection
```

After establishing the connection:

```text
Client ─────► Server
Client ◄───── Server
Client ─────► Server
Client ◄───── Server
```

Both sides can communicate without repeatedly establishing a new connection.

The source explains that this persistent connection is useful for real-time applications such as:

- Chat applications
- Online gaming
- Live updates

fileciteturn4file0L220-L235

---

# ⚖️ Socket vs WebSocket Comparison

| Feature             | Typical Socket Request/Response                        | WebSocket                     |
| ------------------- | ------------------------------------------------------ | ----------------------------- |
| Connection          | Request-response oriented                              | Persistent                    |
| Connection lifetime | Typically closed after exchange in the episode's model | Remains open                  |
| Communication       | Request → response                                     | Two-way ongoing communication |
| Real-time use       | Less suitable                                          | Highly suitable               |
| Chat                | Not ideal for continuous updates                       | Suitable                      |
| Live updates        | Less suitable                                          | Suitable                      |
| Gaming              | Less suitable for persistent communication             | Suitable                      |

### Simple memory trick

```text
Socket:
Connect → Request → Response → Close

WebSocket:
Connect → Keep Open → Communicate Continuously
```

---

# 🧑‍💻 Creating a Server with Node.js

The accompanying README contains a basic Node.js HTTP server.

```javascript
const http = require("node:http");

const port = 999;

const server = http.createServer(function (req, res) {
  res.end("server Created");
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});
```

The source uses:

```text
localhost:999
```

and creates the server using Node.js's built-in `http` module. fileciteturn4file1L46-L58

---

# 🔍 Understanding the Code

## 1. Import the HTTP module

```javascript
const http = require("node:http");
```

This loads Node.js's built-in HTTP functionality.

---

## 2. Define the port

```javascript
const port = 999;
```

The server will listen on port `999`.

---

## 3. Create the server

```javascript
const server = http.createServer(function (req, res) {
  res.end("server Created");
});
```

The callback receives:

```text
req → Request
res → Response
```

Conceptually:

```text
Client Request
      ↓
     req
      ↓
createServer callback
      ↓
     res
      ↓
Client Response
```

---

## 4. Start listening

```javascript
server.listen(port, () => {
  console.log("Server running on port " + port);
});
```

This tells Node.js to listen for incoming connections on the specified port.

---

# 🛣️ Handling Different URLs

The accompanying README then demonstrates checking the requested URL:

```javascript
const http = require("node:http");

const port = 999;

const server = http.createServer(function (req, res) {
  if (req.url === "/getSecretData") {
    res.end("You are a human and the the secret so chill");
  }

  res.end("server Created");
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});
```

The source demonstrates the idea of handling a route such as:

```text
localhost:3000/getsecretdata
```

while the code itself uses:

```text
/getSecretData
```

fileciteturn4file1L61-L75

> **Note:** The source contains a capitalization mismatch between the displayed URL and the route string. Preserve this distinction when testing the code because URL path matching is case-sensitive in typical Node.js request handling.

---

# 🛣️ URL Routing Concept

A URL can contain:

```text
Protocol
   ↓
Domain
   ↓
Port
   ↓
Path
```

For example:

```text
http://localhost:999/getSecretData
```

can be conceptually broken into:

```text
http
  ↓
Protocol

localhost
  ↓
Host

999
  ↓
Port

/getSecretData
  ↓
Path
```

The server can inspect:

```javascript
req.url;
```

and decide what response to return.

---

# ⚡ Express

At the end of the episode, the source introduces **Express**.

The accompanying README states:

> **Express is a framework built on top of Node.js that makes our lives easier.** fileciteturn4file1L80-L80

The basic relationship is:

```text
Node.js
   ↓
HTTP capabilities
   ↓
Express
   ↓
Easier server development
```

Express simplifies common server-side tasks such as:

- Routing
- Request handling
- Middleware
- API development

The supplied source specifically establishes Express as a framework built on Node.js; detailed middleware/API features are not covered in the supplied Episode-11 material.

---
