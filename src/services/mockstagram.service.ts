import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MockstagramService {
  constructor() {}

  async getMockInstData(id: Number) {
    try {
      const result = await axios.get(`localhost:3001/api/v1/influencers/${id}`);

      return result.data;
    } catch (error) {
      console.error('error in getting data from mockinstagram' + ' ' + error);
    }
  }
}
