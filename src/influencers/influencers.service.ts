import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateInfluencerDto } from 'src/dto/influencer.dto';
import {
  Influencers,
  TimeSeriesData,
} from 'src/interface/influencer.interface';
import { MockstagramService } from 'src/services/mockstagram.service';

@Injectable()
export class InfluencersService {
  constructor(
    @Inject('INFLUENCER_MODEL')
    private influencerModel: mongoose.Model<Influencers>,
    private mockGramservice: MockstagramService,
  ) {}

  async putInfluencersData(id: Number): Promise<Influencers> {
    console.log(`Adding an influencer follower count`);
    try {
      const dataFromMock = await this.mockGramservice.getMockInstData(id);
      const influencer = {} as Influencers;
      influencer.followerCount = dataFromMock.followerCount;
      influencer.pk = dataFromMock.pk;
      influencer.userName = dataFromMock.username;
      const createInfluencer = new this.influencerModel(influencer);
      return await createInfluencer.save();
    } catch (error) {
      console.error('Adding of influencer failed with error' + error);
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
          message: error?.message ?? 'Something went wrong',
        },
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInfluencers(
    startId: Number,
    endId: Number,
  ): Promise<TimeSeriesData[]> {
    //console.log(new Date());
    try {
      const aggregationPipeline = [
        {
          $match: {
            pk: { $gte: startId, $lte: endId },
          },
        },
        {
          $group: {
            _id: '$pk',
            dataPoints: {
              $push: { count: '$followerCount', time: '$createdAt' },
            },
          },
        },
        {
          $project: {
            pk: '$_id',
            dataPoints: 1,
            _id: 0,
          },
        },
      ];
      const result = await this.influencerModel.aggregate(aggregationPipeline);
      return result;
    } catch (error) {
      console.error('get influencers failed with error' + error);
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
          message: error?.message ?? 'Something went wrong',
        },
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
