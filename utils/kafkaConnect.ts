import { Kafka, Producer, RecordMetadata } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "my-express-api",
  brokers: ["localhost:9092"],
});

const producer: Producer = kafka.producer();

const connectProducer = async (): Promise<void> => {
  await producer.connect();
  console.log("✅ Kafka Producer connected.");
};

const sendJson = async <T = unknown>(
  topic: string,
  key: string | Buffer | null,
  data: T
): Promise<RecordMetadata[]> => {
  return producer.send({
    topic: topic,
    messages: [
      {
        key: key,
        value: JSON.stringify(data),
      },
    ],
  });
};

export { connectProducer, sendJson };