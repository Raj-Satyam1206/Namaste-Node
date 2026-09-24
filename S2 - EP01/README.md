# Episode 01 — Microservices vs Monolith

A simple set of notes on **how software projects are developed in companies** and the difference between **Monolithic** and **Microservices Architecture**.

> This episode focuses on project development and architecture concepts rather than writing code.

## 📚 Topics Covered

- Software Project Development in Industry
- Waterfall Model / SDLC
- Requirement
- Design
- Development
- Testing
- Deployment
- Maintenance
- Monolithic Architecture
- Microservices Architecture
- Monolith vs Microservices
- Scalability
- Deployment
- Infrastructure Cost
- Fault Isolation
- Testing
- Ownership
- Maintenance
- Debugging
- Developer Experience

---

## 🔄 Software Project Development

The **Waterfall Model** is a sequential development process where each phase is completed before moving to the next.

```text
Requirement
     ↓
Design
     ↓
Development
     ↓
Testing
     ↓
Deployment
     ↓
Maintenance
```

### 1. Requirement

Gather and analyze the project's functional and non-functional requirements.

**Roles:** Business Analysts, Project Managers, Stakeholders, Product Owners

### 2. Design

Create the system architecture and detailed design based on the requirements.

**Roles:** Solution Architects, UX/UI Designers, System Designers, Technical Leads

### 3. Development

Develop the actual software and integrate different modules.

**Roles:** Software Developers, Frontend/Backend Developers, DBAs, DevOps Engineers

### 4. Testing

Test the application to identify bugs and defects.

Examples:

- Unit Testing
- Integration Testing
- System Testing
- Acceptance Testing

### 5. Deployment

Deploy the completed application to the live environment.

### 6. Maintenance

Fix issues and implement updates and improvements after deployment.

---

# 🏗️ Project Building Strategies

There are two major architectural approaches discussed in this episode:

```text
Monolith
   vs
Microservices
```

---

## 🧱 Monolithic Architecture

In a **Monolithic Architecture**, the application's major components are part of a single codebase.

It may contain:

```text
Frontend
Backend
Database Logic
Authentication
Analytics
Other Features
```

Conceptually:

```text
        MONOLITH
┌─────────────────────────┐
│ Frontend                │
│ Backend                 │
│ Authentication          │
│ Analytics               │
│ Other Features          │
└─────────────────────────┘
```

### Characteristics

- Single codebase
- Components are tightly integrated
- Easier to deploy as one application
- Suitable for smaller projects
- Can become harder to maintain as the project grows

---

## 🔬 Microservices Architecture

In **Microservices Architecture**, the application is divided into smaller, independent services.

For example:

```text
                Application
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
 Authentication   Notification   Payment
   Service          Service       Service
```

Each service can be:

- Developed independently
- Deployed independently
- Scaled independently
- Maintained independently

Different teams can also take ownership of different services.

---

# ⚖️ Monolith vs Microservices

| Parameter               | Monolith                                 | Microservices                                     |
| ----------------------- | ---------------------------------------- | ------------------------------------------------- |
| **Codebase**            | Single codebase                          | Multiple services/repositories                    |
| **Development**         | Simple for small projects                | More setup initially                              |
| **Scalability**         | Scale the application as a whole         | Scale individual services                         |
| **Tech Stack**          | Usually a common stack                   | Different services can use different technologies |
| **Infrastructure Cost** | Generally lower                          | Generally higher                                  |
| **Complexity**          | Simpler initially                        | More complex due to distributed services          |
| **Fault Isolation**     | Failure can affect the whole application | Failures can be isolated to a service             |
| **Testing**             | Simpler in one application               | More complex due to distributed services          |
| **Ownership**           | More centralized                         | Teams can own individual services                 |
| **Maintenance**         | Can become harder as the codebase grows  | Smaller services can be easier to maintain        |
| **Debugging**           | Easier to trace within one codebase      | More difficult across multiple services           |
| **Tech Flexibility**    | More limited                             | Services can use different technologies           |

---

# 🚀 Example

### Monolith

```text
                   Application
                       │
       ┌───────────────┼───────────────┐
       ↓               ↓               ↓
   Frontend         Backend        Authentication
       │               │               │
       └───────────────┴───────────────┘
                 Single Codebase
```

### Microservices

```text
                    Application
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   User Service     Auth Service     Payment Service
        │                │                │
     Database         Database         Database
```

The microservices approach allows individual services to be developed and deployed separately.

---

# 🎯 Key Takeaways

- Software projects can be developed through structured phases such as Requirement, Design, Development, Testing, Deployment, and Maintenance.
- A monolith keeps the application's components in a single codebase.
- Microservices divide the application into smaller independent services.
- Monoliths are generally simpler for smaller projects.
- Microservices provide independent scaling and deployment.
- Microservices can introduce additional infrastructure and communication complexity.
- Monolithic applications can become harder to maintain as they grow.
- Microservices allow different teams to own different services.
- The choice between Monolith and Microservices depends on the project's size, team structure, and requirements.

---

## 📌 Quick Revision

```text
SOFTWARE DEVELOPMENT
        │
        ├── Requirement
        ├── Design
        ├── Development
        ├── Testing
        ├── Deployment
        └── Maintenance


ARCHITECTURE
        │
        ├── MONOLITH
        │      └── Single Codebase
        │
        └── MICROSERVICES
               ├── Auth Service
               ├── User Service
               ├── Payment Service
               └── Notification Service
```
