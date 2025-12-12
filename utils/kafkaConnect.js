import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-express-api",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer connected.");
};

const sendJson = async (topic, key, data) => {
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
