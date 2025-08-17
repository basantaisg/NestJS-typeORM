import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateListingDto {
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  description: string;
}
