import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Name must be string!' })
  @MinLength(3)
  @MaxLength(20)
  name: string;
  @IsBoolean({ message: 'Public must be set either true or false' })
  public: boolean;
}
