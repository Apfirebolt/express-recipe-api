import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import Notification from "../models/Notification.ts";

// Define interface for the incoming Kafka message payload
interface RecipeEventPayload {
  recipeId: string;
  userId: string;
  title: string;
}

const kafka: Kafka = new Kafka({
  clientId: "notification-consumer",
  brokers: ["localhost:9092"],
});

const consumer: Consumer = kafka.consumer({
  groupId: "recipe-notification-group",
});

const TOPIC = "recipes";

export async function runNotificationGenerator(): Promise<void> {
  await consumer.connect();
  console.log("Consumer connected.");

  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({
      topic,
      partition,
      message,
    }: EachMessagePayload): Promise<void> => {
      try {
        if (!message.value) {
          console.warn(`[${TOPIC} Consumer] Received empty message body.`);
          return;
        }

        // 1. Parse the Kafka message payload with type casting
        const recipeEvent: RecipeEventPayload = JSON.parse(
          message.value.toString()
        );

        const { recipeId, userId, title } = recipeEvent;

        console.log(
          `[${TOPIC} Consumer] Received new recipe event: ${title} (Recipe ID: ${recipeId})`
        );

        // 2. Generate the Notification content
        const notificationTitle = `New Recipe Created!`;
        const notificationContent = `Your recipe "${title}" (ID: ${recipeId}) has been successfully created and published.`;

        // 3. Create the Notification document in MongoDB
        await Notification.create({
          user: userId,
          title: notificationTitle,
          content: notificationContent,
        });

        console.log(
          `[Notification Generator] Created DB notification for user ${userId}.`
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            `Error processing message from topic ${topic}:`,
            error.message
          );
        } else {
          console.error(
            `Error processing message from topic ${topic}:`,
            error
          );
        }
      }
    },
  });

  console.log(
    `✅ Notification Generator Consumer is running for topic: ${TOPIC}`
  );
}