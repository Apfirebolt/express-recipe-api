import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";

import { notFound, errorHandler } from "./middleware/Error.js";
import connectDB from "./config/db.js";

import { connectProducer } from "./utils/kafkaConnect.js";
import { startAllConsumers } from "./consumers/index.js";

import userRoutes from "./routes/UserRoutes.js";
import recipeRoutes from "./routes/RecipeRoutes.js";
import ingredientRoutes from "./routes/IngredientRoutes.js";
import stepRoutes from "./routes/StepRoutes.js";
import pictureRoutes from "./routes/PictureRoutes.js";

dotenv.config();

// Initialize MongoDB Connection
connectDB();

const app: Express = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// CORS configuration
const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:8080",
    "http://localhost",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/pictures", pictureRoutes);

// Static files & Production setup
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("/", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("API is running....");
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT: string | number = process.env.PORT || 5000;

async function startApplication(): Promise<void> {
  try {
    // Connect Kafka Producer & Consumers
    await connectProducer();
    await startAllConsumers();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error: unknown) {
    console.error(
      "❌ FATAL ERROR: Failed to start application services:",
      error
    );
    process.exit(1);
  }
}

startApplication();