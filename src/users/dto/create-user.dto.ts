import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(250)
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age?: number;
}
