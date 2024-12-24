import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaProducerService } from './kafka/kafka.producer.service';

@Injectable()
export class AppService {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}
  async onModuleInit() {
    try {
      await this.kafkaProducer.pushRangesToKafka(50000, 1000000);
    } catch (error) {
      console.error('error in calling kafka producer' + ' ' + error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
