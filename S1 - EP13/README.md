# Episode 13 — Creating a Database & MongoDB

This episode covers the basics of **MongoDB**, setting up a MongoDB Atlas database, connecting it using MongoDB Compass and Node.js, and performing basic CRUD operations.

## 🍃 MongoDB

MongoDB is a **NoSQL document database** that stores data in flexible, JSON-like documents.

There are two common ways to use MongoDB:

1. **Install MongoDB locally**
2. **Use MongoDB Atlas** — a cloud-based managed MongoDB service

### MongoDB Editions

- **Community Edition** — free and suitable for developers and personal projects.
- **Enterprise Edition** — designed for organizations with additional features and support.

---

## ☁️ MongoDB Atlas

MongoDB Atlas allows us to use MongoDB without managing the database server ourselves.

### Basic Setup

1. Create a MongoDB Atlas account.
2. Create a free **M0 cluster**.
3. Select a cloud provider and region.
4. Create a database user.
5. Configure Network Access.
6. Get the connection string.
7. Connect to the cluster using MongoDB Compass or Node.js.

Example connection string:

```text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
```

> **Note:** Never upload real database credentials or connection strings containing passwords to GitHub.

---

## 🧭 MongoDB Compass

**MongoDB Compass** is a graphical interface used to interact with MongoDB databases.

Using Compass, we can:

- Connect to a MongoDB cluster
- Create databases
- Create collections
- Insert documents
- View documents
- Update documents
- Delete documents

MongoDB uses **collections** instead of SQL tables and **documents** instead of rows.

---

## 🗃️ Database Structure

MongoDB follows this basic structure:

```text
Database
   ↓
Collection
   ↓
Document
```

Example document:

```javascript
{
    firstname: "Satyam",
    lastname: "Raj",
    city: "Patna",
    phoneNumber: "2343455"
}
```

MongoDB automatically generates an `_id` for documents.

---

## 🟢 Connecting MongoDB with Node.js

First install the MongoDB Node.js driver:

```bash
npm install mongodb
```

Basic connection:

```javascript
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "Namaste-Nodejs";

async function main() {
  await client.connect();

  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("User");
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```

---

## 🔄 CRUD Operations

CRUD stands for:

```text
C → Create
R → Read
U → Update
D → Delete
```

### Create

Insert documents into a collection:

```javascript
const data = {
  firstname: "Satyam",
  lastname: "Raj",
  city: "Patna",
};

const result = await collection.insertMany([data]);
```

### Read

Retrieve documents:

```javascript
const result = await collection.find({}).toArray();
```

### Update

Modify an existing document:

```javascript
const result = await collection.updateOne(
  { _id: new ObjectId("67066d6a3be8f41630d5dae4") },
  { $set: { firstname: "Mint" } },
);
```

### Delete

Delete a document:

```javascript
const result = await collection.deleteOne({
  _id: new ObjectId("670668562c6bd11e25050c13"),
});
```

---

## 🧩 Mongoose

**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js.

Install it using:

```bash
npm install mongoose
```

Mongoose provides:

- Schema definitions
- Validation
- Middleware
- Easier interaction with MongoDB

---
