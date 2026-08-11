import mongoose, { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import User from "../models/User.ts";
import Recipe from "../models/Recipe.ts";

// Interface for raw recipe object before insertion into MongoDB
interface SeedRecipePayload {
  user: Types.ObjectId;
  title: string;
}

// Database connection string
const MONGO_URI: string =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/express-recipe";

async function seedRecipes(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Fetch all user _ids directly from the database
    const users = await User.find().select("_id");

    if (users.length === 0) {
      console.error(
        "❌ No users found in the database. Please seed users first!"
      );
      process.exit(1);
    }

    const userIds: Types.ObjectId[] = users.map(
      (user) => user._id as Types.ObjectId
    );
    console.log(`✅ Found ${userIds.length} users in the database.`);

    // 2. Define batch configurations for high performance
    const TOTAL_RECIPES = 10000;
    const BATCH_SIZE = 1000;

    console.log(`🚀 Starting batch insert of ${TOTAL_RECIPES} recipes...`);
    const startTime = Date.now();

    for (let i = 0; i < TOTAL_RECIPES; i += BATCH_SIZE) {
      const recipeBatch: SeedRecipePayload[] = [];

      for (let j = 0; j < BATCH_SIZE; j++) {
        // Pick a random user ID from the array
        const randomUserId =
          userIds[Math.floor(Math.random() * userIds.length)];

        // Generate dish title using @faker-js/faker (with fallback for different versions)
        const dishTitle =
          faker.food && typeof faker.food.dish === "function"
            ? faker.food.dish()
            : `${faker.word.adjective()} ${faker.word.noun()} Recipe`;

        recipeBatch.push({
          user: randomUserId,
          title: dishTitle,
        });
      }

      // Bulk insert 1,000 records per database call
      await Recipe.insertMany(recipeBatch);
      console.log(`📦 Inserted ${i + BATCH_SIZE} / ${TOTAL_RECIPES} recipes...`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`🎉 Successfully generated 10,000 recipes in ${duration}s!`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error seeding recipes:", error.message, error);
    } else {
      console.error("❌ Error seeding recipes:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
}

seedRecipes();