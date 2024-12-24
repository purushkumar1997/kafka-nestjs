import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluencersModule } from './influencers/influencers.module';
import { TransformInterceptor } from './interceptors/response.interceptor';
import { MongodbModule } from './mongodb/mongodb.module';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaProducerService } from './kafka/kafka.producer.service';

@Module({
  imports: [InfluencersModule, MongodbModule, KafkaModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    KafkaProducerService,
    AppService,
  ],
})
export class AppModule {}
