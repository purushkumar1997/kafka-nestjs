import * as mongoose from 'mongoose';
import { Influencers } from 'src/interface/influencer.interface';

export const influencerSchema = new mongoose.Schema<Influencers>(
  {
    pk: { type: Number, required: true },
    userName: { type: String, required: true },
    followerCount: { type: Number, required: true },
  },
  { timestamps: true },
);

influencerSchema.index({ pk: 1, createdAt: 1 });

export const InfluencerModel = mongoose.model<Influencers>(
  'influencers',
  influencerSchema,
  'influencers',
);
