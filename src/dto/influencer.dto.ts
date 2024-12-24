import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateInfluencerDto {
  @IsInt()
  @IsNotEmpty()
  pk: number;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsInt()
  @IsNotEmpty()
  followerCount: number;
}

export class PKrangeId {
  @IsInt()
  @IsNotEmpty()
  startId: number;

  @IsInt()
  @IsNotEmpty()
  endId: number;
}
