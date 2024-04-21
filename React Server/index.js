const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb server configuration
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_PASSWORD);

// root routing
app.get("/", (req, res) => {
  res.send("Hello react coffe server!");
});

// mongo db server uri
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.sizskqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// mongodb client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// run client and connect to the cluster server
const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(`mongodb server connected successfully`);
  } finally {
    await client.close();
  }
};
run().catch(console.dir);
// server listen port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
