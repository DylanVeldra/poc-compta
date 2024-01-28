import { ApiProperty } from '@nestjs/swagger';
import { MultiFactorsDto } from '@utils/dto/multi-factors.dto';
import { IsString, Length, Matches } from 'class-validator';

export class UpdateAntiphishingCodeDto extends MultiFactorsDto {
  @IsString()
  @Matches('^[A-Z0-9]{6}$', '', {
    message:
      'Antiphishing code must be composed of 6 alphanumeric uppercase characters',
  })
  @Length(6, 6)
  @ApiProperty({
    description:
      'The antiphishing code, composed of 6 alphanumeric uppercase characters',
    example: 'ER39C9',
  })
  readonly antiPhishingCode: string;
}
