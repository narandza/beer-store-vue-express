import { MongoClient } from "mongodb";
require("dotenv").config();
const dataBaseKey = process.env.DATA_BASE_KEY;

const url = `mongodb+srv://dimitrijejovanovic3519:${dataBaseKey}@beerapp.vbtlxdd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

export async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("test");
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Failed to connect to the database");
  }
}

export default connectToDatabase;
