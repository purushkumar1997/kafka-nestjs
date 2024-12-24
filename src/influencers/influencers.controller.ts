import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/decorators/responseMessage.decorators';
import { CreateInfluencerDto, PKrangeId } from 'src/dto/influencer.dto';
import {
  Influencers,
  TimeSeriesData,
} from 'src/interface/influencer.interface';
import { InfluencersService } from './influencers.service';

@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencerService: InfluencersService) {}

  @HttpCode(201)
  @Post('/add/:id')
  @ResponseMessage('Influencer Data added successfully')
  async addInfluencer(@Param('id') id: Number): Promise<Influencers> {
    return await this.influencerService.putInfluencersData(id);
  }

  @HttpCode(200)
  @Get('/')
  @ResponseMessage('Got data successfully')
  async getInfluencers(@Body() range: PKrangeId): Promise<TimeSeriesData[]> {
    return await this.influencerService.getInfluencers(
      range.startId,
      range.endId,
    );
  }
}
