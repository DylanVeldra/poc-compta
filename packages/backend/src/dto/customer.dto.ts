import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerDTO {
  @ApiProperty({
    description: 'Name of the customer',
  })
  @IsString()
  @Length(0, 256)
  readonly name: string;

  @ApiProperty({
    description: 'billing street',
  })
  @IsString()
  @Length(0, 256)
  readonly street: string;

  @ApiProperty({
    description: 'billing postalCode',
  })
  @IsString()
  @Length(0, 256)
  readonly postalCode: string;

  @ApiProperty({
    description: 'billing city',
  })
  @IsString()
  @Length(0, 256)
  readonly city: string;

  @ApiProperty({
    description: 'billing country',
  })
  @IsString()
  @Length(0, 256)
  readonly country: string;

  @ApiProperty({
    description:
      "if isCompany === true, should have a registryId. If isCompany === false, vatId and registryId won't be used.",
  })
  @IsBoolean()
  readonly isCompany: boolean;

  @ApiProperty({
    description: 'vatId will not be used if isCompany === false',
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  readonly vatId?: string;

  @ApiProperty({
    description: 'registryId mandatory if isCompany === true',
  })
  @IsString()
  @IsOptional()
  @Length(0, 256)
  readonly registryId?: string;
}
