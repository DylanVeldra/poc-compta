import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class TwoFactorDto {
  @Length(6, 6)
  @ApiProperty({
    example: '123456',
    description: 'The two factor code',
  })
  twoFactorToken: string;
}
