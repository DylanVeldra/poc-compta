import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MultiFactorsDto {
  @Length(6, 6)
  @ApiProperty({
    example: '123456',
    description: 'The two factor code',
  })
  twoFactorToken?: string;

  @Length(6, 6)
  @ApiProperty({
    example: '123456',
    description: 'The code received by email',
  })
  emailCode?: string;
}
