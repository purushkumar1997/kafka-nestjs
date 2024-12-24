import * as dotenv from 'dotenv';
dotenv.config();

export const constants = {
  db_url: process.env.DB_BASE_URL,
  kafka_topic: process.env.KAFKA_TOPIC,
  kafka_group: process.env.KAFKA_GROUP,
  kafka_client: process.env.KAFKA_CLIENT,
};
