import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

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

  @ApiProperty({
    description: 'registryId of the company',
  })
  @IsString()
  @Length(0, 256)
  readonly registryId: string;

  @ApiProperty({
    description:
      'vatId of the company, could be null if the company is freshly created and still not have vatId',
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  readonly vatId?: string;
}
