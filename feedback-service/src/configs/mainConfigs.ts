import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "myProject";

const client = new MongoClient(DATABASE_URL);

export const dbInit = async () => {
    console.log(DATABASE_URL);
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully!");

    const db = client.db(DB_NAME);
    
    await db.command({ ping: 1 });
    console.log("✅ Ping MongoDB Successful");

    return db;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};