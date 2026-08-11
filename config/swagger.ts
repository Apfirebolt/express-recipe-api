import { Express, Request, Response } from "express";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Recipe API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express Recipe app featuring Auth, Recipes, Kafka, and MongoDB.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // Path to the API docs annotations (scans routes and models)
  apis: ["./routes/*.ts", "./controllers/*.ts", "./models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  // Swagger UI Endpoint
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Raw JSON format docs endpoint
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("📖 Swagger docs available at http://localhost:5000/docs");
}