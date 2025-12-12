// 1. Import your new consumer function
import { runNotificationGenerator } from './generateNotification.js'; 

// Array of all consumer functions
const consumerRunners = [
    runNotificationGenerator,
];

export async function startAllConsumers() {
    for (const runner of consumerRunners) {
        runner().catch(error => {
            console.error(`🔴 Consumer failed to start: ${error.message}`, error);
        });
    }
    console.log('🏁 All Kafka Consumers started as background workers.');
}