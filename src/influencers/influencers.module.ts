import { Module } from '@nestjs/common';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';
import { Connection } from 'mongoose';
import { Influencers } from 'src/interface/influencer.interface';
import { influencerSchema } from 'src/schemas/influencers.schema';
import { MockstagramService } from 'src/services/mockstagram.service';

@Module({
  imports: [MongodbModule],
  controllers: [InfluencersController],
  providers: [
    InfluencersService,
    MockstagramService,
    {
      provide: 'INFLUENCER_MODEL',
      useFactory: async (connection: Connection) => {
        return await connection.model<Influencers>(
          'influencers',
          influencerSchema,
        );
      },
      inject: ['DATABASE_CONNECTION'],
    },
  ],
  exports: [InfluencersService, 'INFLUENCER_MODEL'],
})
export class InfluencersModule {}
