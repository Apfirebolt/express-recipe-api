// consumers/generateNotifications.js

import { Kafka } from "kafkajs";
import Notification from "../models/Notification.js"; 

const kafka = new Kafka({
  clientId: "notification-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: 'recipe-notification-group' }); 
const TOPIC = 'recipes';
// --------------------------------------------------------

export async function runNotificationGenerator() {
  
  await consumer.connect();
  console.log("Consumer connected.");

  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // 1. Parse the Kafka message payload
        const recipeEvent = JSON.parse(message.value.toString());

        const { recipeId, userId, title } = recipeEvent;

        console.log(`[${TOPIC} Consumer] Received new recipe event: ${title} (Recipe ID: ${recipeId})`);

        // 2. Generate the Notification content
        const notificationTitle = `New Recipe Created!`;
        const notificationContent = `Your recipe "${title}" (ID: ${recipeId}) has been successfully created and published.`;

        // 3. Create the Notification document in MongoDB
        await Notification.create({
          user: userId, // This refers to the creator of the recipe
          title: notificationTitle,
          content: notificationContent,
        });

        console.log(`[Notification Generator] Created DB notification for user ${userId}.`);

      } catch (error) {
        // Log errors without stopping the consumer loop
        console.error(`Error processing message from topic ${topic}:`, error.message);
      }
    },
  });

  console.log(`✅ Notification Generator Consumer is running for topic: ${TOPIC}`);
}