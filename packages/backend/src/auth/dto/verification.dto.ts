import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CodeDto {
  @ApiProperty({
    description: 'The code sent by the user',
  })
  @Length(6, 6)
  @IsString()
  readonly code: string;
}

export class PassphraseDto {
  @ApiProperty({
    description: 'The backupcode for the 2FA recover',
  })
  @Length(64, 64)
  @IsString()
  readonly passphrase: string;
}
