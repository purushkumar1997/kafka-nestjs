import { Module } from '@nestjs/common';
import { InfluencersModule } from 'src/influencers/influencers.module';
import { InfluencersService } from 'src/influencers/influencers.service';
import { KafkaConsumerService } from './kafka.consumer.service';
import { KafkaProducerService } from './kafka.producer.service';

@Module({
  imports: [InfluencersModule],
  providers: [KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule {}
