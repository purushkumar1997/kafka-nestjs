import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { constants } from 'src/helper/constants';
import { InfluencersService } from 'src/influencers/influencers.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: any;

  constructor(private influencerService: InfluencersService) {}

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: constants.kafka_client,
      brokers: ['localhost:9092'],
    });
    this.consumer = this.kafka.consumer({
      groupId: constants.kafka_group,
      sessionTimeout: 30000,
      heartbeatInterval: 3000,
    });

    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: constants.kafka_topic,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const { startId, endId } = JSON.parse(message.value.toString());
          await this.processRange(startId, endId);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  }

  private async processRange(startId: number, endId: number) {
    console.log(`Processing range: ${startId} - ${endId}`);

    try {
      const result = await this.influencerService.getInfluencers(
        startId,
        endId,
      );

      result.forEach((res) => {
        console.log(`InfluencerId - ${res.pk}`);
        console.log(`records count - ${res.dataPoints.length}`);
      });
    } catch (error) {
      console.error('error in processrange' + ' ' + error);
    }
  }
}
