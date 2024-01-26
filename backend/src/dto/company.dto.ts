import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCompanyDTO {
  @ApiProperty({
    description: 'Name of the company',
  })
  @IsString()
  @Length(0, 256)
  readonly name: string;

  @ApiProperty({
    description: 'Type of the company, LLC, SIA, OU, Micro-Entreprise',
  })
  @IsString()
  @Length(0, 256)
  readonly type: string;
}
