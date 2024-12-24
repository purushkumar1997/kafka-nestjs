export interface Influencers {
  pk: Number;
  userName: string;
  followerCount: Number;
}

export interface TimeSeriesData {
  pk: Number;
  dataPoints: DataPoint[];
}

export interface DataPoint {
  count: Number;
  time: Date;
}
