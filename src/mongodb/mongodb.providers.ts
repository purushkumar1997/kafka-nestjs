import * as mongoose from 'mongoose';
import { constants } from 'src/helper/constants';

export const mongoDbproviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const client = await mongoose.connect(constants.db_url);
      return client;
    },
  },
];
