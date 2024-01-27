import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ColorHex } from '@utils/validators/color.validator';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

class NumericDto {
  @ApiProperty({
    description: 'The numeric value of the tag',
  })
  @IsNumber()
  readonly id: number;
}

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag, he has to be unique',
  })
  @IsString()
  @Length(1, 30)
  readonly name: string;

  @ApiProperty({
    description: 'The color of the tag in hexadecimal format',
  })
  @ColorHex()
  readonly color: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
  })
  @IsOptional()
  @Length(1, 512)
  readonly description?: string;
}

export class UpdateTagDto {
  @ApiPropertyOptional({
    description: 'The name of the tag, he has to be unique',
  })
  @IsOptional()
  @Length(1, 30)
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'The color of the tag in hexadecimal format',
  })
  @IsOptional()
  @ColorHex()
  readonly color?: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
  })
  @IsOptional()
  @Length(1, 512)
  readonly description?: string;
}

export type TagDto = NumericDto & CreateTagDto;
