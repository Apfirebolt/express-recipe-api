import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// Single database connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/express-recipe";

async function seedRecipes() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Fetch all user _ids directly from the database
    const users = await User.find().select("_id");

    if (users.length === 0) {
      console.error("❌ No users found in the database. Please seed users first!");
      process.exit(1);
    }

    const userIds = users.map((user) => user._id);
    console.log(`✅ Found ${userIds.length} users in the database.`);

    // 2. Define batch configurations for high performance
    const TOTAL_RECIPES = 10000;
    const BATCH_SIZE = 1000;

    console.log(`🚀 Starting batch insert of ${TOTAL_RECIPES} recipes...`);
    const startTime = Date.now();

    for (let i = 0; i < TOTAL_RECIPES; i += BATCH_SIZE) {
      const recipeBatch = [];

      for (let j = 0; j < BATCH_SIZE; j++) {
        // Pick a random user ID from the array
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

        recipeBatch.push({
          user: randomUserId,
          title: faker.food.dish(),
        });
      }

      // Bulk insert 1,000 records per database call
      await Recipe.insertMany(recipeBatch);
      console.log(`📦 Inserted ${i + BATCH_SIZE} / ${TOTAL_RECIPES} recipes...`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`🎉 Successfully generated 10,000 recipes in ${duration}s!`);

  } catch (error) {
    console.error("❌ Error seeding recipes:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit();
  }
}

seedRecipes();