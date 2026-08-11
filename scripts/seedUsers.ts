import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User.ts";

// Interface for raw user object before insertion into MongoDB
interface SeedUserPayload {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const MONGO_URI: string =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/express-recipe";

async function seedUsers(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const TOTAL_USERS = 500;
    const BATCH_SIZE = 100;
    const PASSWORD = "password123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    console.log(`Starting batch insert of ${TOTAL_USERS} users...`);
    const startTime = Date.now();

    for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
      const usersBatch: SeedUserPayload[] = [];
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_USERS - i);

      for (let j = 0; j < currentBatchSize; j++) {
        const index = i + j + 1;
        
        // Generate random username using @faker-js/faker v8+ / v9+ API
        const rawUsername = faker.internet.username
          ? faker.internet.username()
          : faker.internet.userName();

        const usernameBase = rawUsername
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        usersBatch.push({
          username: `${usernameBase}${index}`,
          email: `seeduser${index}@example.com`,
          password: hashedPassword,
          isAdmin: false,
        });
      }

      await User.insertMany(usersBatch, { ordered: false });
      console.log(`Inserted ${i + currentBatchSize} / ${TOTAL_USERS} users...`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Successfully inserted ${TOTAL_USERS} users in ${duration}s`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error seeding users:", error.message, error);
    } else {
      console.error("Error seeding users:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seedUsers();