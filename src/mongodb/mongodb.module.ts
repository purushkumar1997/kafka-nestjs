import { Module } from '@nestjs/common';
import { mongoDbproviders } from './mongodb.providers';

@Module({
  providers: [...mongoDbproviders],
  exports: [...mongoDbproviders],
})
export class MongodbModule {}
