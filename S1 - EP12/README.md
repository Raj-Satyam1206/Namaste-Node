# Episode 12 — Databases: SQL & NoSQL

## A simple set of notes covering databases, relational databases, NoSQL databases, and the differences between SQL and NoSQL.

## 🗄️ What is a Database?

A **database** is an organized collection of data that can be stored, managed, and accessed using a **Database Management System (DBMS)**.

A DBMS provides the software and tools required to interact with and manage the stored data.

---

## 📌 Types of Databases

### 1. Relational Database

Examples:

- MySQL
- PostgreSQL

Relational databases store data in **tables** made up of rows and columns. They generally use predefined schemas and are suitable for structured data, complex queries, and transactions.

### 2. NoSQL Database

Example:

- MongoDB

MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents.

### 3. In-Memory Database

Example:

- Redis

Redis is an in-memory database known for fast data processing. It can be used for caching, real-time analytics, and message brokering.

### 4. Distributed SQL Database

Example:

- CockroachDB

CockroachDB is designed to scale horizontally across multiple nodes while providing strong consistency and ACID transactions.

### 5. Time-Series Database

Example:

- InfluxDB

InfluxDB is optimized for time-stamped data and is commonly used for monitoring, analytics, and IoT applications.

### 6. Object-Oriented Database

Example:

- db4o

Object-oriented databases store data as objects and closely align with object-oriented programming concepts.

### 7. Graph Database

Example:

- Neo4j

Graph databases represent data using nodes, relationships, and properties. They are useful for applications where relationships between data are important.

### 8. Hierarchical Database

Example:

- IBM IMS

Hierarchical databases organize data in a tree-like parent-child structure.

### 9. Network Database

Example:

- IDMS

Network databases represent data using relationships between records and can support complex relationships.

### 10. Cloud Database

Example:

- Amazon RDS

Amazon RDS is a managed cloud database service that supports relational database engines such as MySQL and PostgreSQL.

---

## 🏗️ RDBMS

**RDBMS** stands for **Relational Database Management System**.

Examples:

```text
MySQL
PostgreSQL
```

RDBMS stores data in tables:

```text
Users
-----------------------
ID | Name  | City
-----------------------
1  | Satyam| Patna
2  | Rahul | Delhi
```

### Important Features

- Tables
- Rows and columns
- Predefined schema
- Relationships between tables
- Foreign keys
- Joins
- SQL
- Data normalization
- ACID transactions

---

## 🍃 NoSQL & MongoDB

MongoDB is a popular **NoSQL document database**.

Instead of tables and rows, MongoDB uses:

```text
Database
   ↓
Collections
   ↓
Documents
```

Example document:

```javascript
{
    name: "Satyam",
    city: "Patna",
    hobbies: ["coding", "gym", "music"]
}
```

MongoDB's document structure is similar to JSON objects, which makes it convenient to use with JavaScript applications.

---

## 🧩 NoSQL Database Types

The notes classify NoSQL databases into:

1. Document Databases
2. Key-Value Databases
3. Graph Databases
4. Wide-Column Databases
5. Multi-Model Databases

MongoDB is an example of a **Document Database**.

---

## 🆚 RDBMS vs NoSQL

| Feature       | RDBMS                                 | NoSQL                                  |
| ------------- | ------------------------------------- | -------------------------------------- |
| Structure     | Tables                                | Documents / other structures           |
| Data          | Structured                            | Flexible / semi-structured             |
| Schema        | Predefined                            | Flexible                               |
| Query         | SQL                                   | Database-specific                      |
| Relationships | Foreign keys & joins                  | Embedded data / references             |
| Scaling       | Horizontal scaling can be challenging | Generally easier to scale horizontally |
| Example       | MySQL, PostgreSQL                     | MongoDB                                |

---

## 👨‍🔬 E. F. Codd & Codd's Rules

**E. F. Codd** introduced a set of rules for relational database systems.

The notes refer to them as **Codd's 12 Rules**, numbered from **0 to 12**, resulting in 13 numbered rules.

These rules were designed to define characteristics of relational database systems.

---

## 📖 MySQL

MySQL was developed by **Michael Widenius**.

The notes explain that the name **MySQL** came from his daughter **My**. Related database projects mentioned are:

```text
MySQL
MaxDB
MariaDB
```

MySQL was later acquired by Sun Microsystems, which was subsequently acquired by Oracle. MySQL is currently managed by Oracle.

---

## 📖 PostgreSQL

PostgreSQL was created by **Michael Stonebraker**.

It evolved from the **Ingres** project and later **Post-Ingres**. The project eventually became PostgreSQL and uses SQL for interacting with relational data.

---

## 🔄 SQL vs NoSQL

### SQL / RDBMS

```text
Database
   ↓
Tables
   ↓
Rows + Columns
   ↓
Relationships
   ↓
SQL Queries
```

### NoSQL / MongoDB

```text
Database
   ↓
Collections
   ↓
Documents
   ↓
Key-Value Data
   ↓
Flexible Structure
```

---
