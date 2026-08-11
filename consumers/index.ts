// 1. Import consumer runner functions
import { runNotificationGenerator } from "./generateNotification.js";

type ConsumerRunner = () => Promise<void>;

// Array of all consumer runner functions
const consumerRunners: ConsumerRunner[] = [runNotificationGenerator];

export async function startAllConsumers(): Promise<void> {
  for (const runner of consumerRunners) {
    runner().catch((error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`🔴 Consumer failed to start: ${errorMessage}`, error);
    });
  }
  console.log("🏁 All Kafka Consumers started as background workers.");
}