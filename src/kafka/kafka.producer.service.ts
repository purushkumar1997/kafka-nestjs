import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { constants } from 'src/helper/constants';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: any;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: constants.kafka_client,
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async pushRangesToKafka(batchSize: number, total: number) {
    const totalBatches = Math.ceil(total / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const startId = i * batchSize + 1;
      const endId = Math.min(startId + batchSize - 1, 1000000);

      try {
        await this.producer.connect();
        await this.producer.send({
          topic: constants.kafka_topic,
          messages: [
            {
              value: JSON.stringify({ startId, endId }),
            },
          ],
        });

        console.log(`Pushed range: ${startId} - ${endId}`);
      } catch (error) {
        console.error('error in pushing message to producer' + ' ' + error);
      }
    }
  }
}
