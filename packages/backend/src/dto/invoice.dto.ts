import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { toNumber } from '@utils/functions/toNumber';
import { PaginationIgnoreDto } from '@utils/pipes/pagination';
import { INVOICE_STATUS } from '@prisma/client';

export class InvoiceRowDTO {
  @ApiProperty({
    description: "The description of the invoice's row",
    example: 'Backend development',
  })
  @IsString()
  @Length(1, 512)
  description: string;

  @ApiProperty({
    description: 'The amount of the row',
    example: 1,
  })
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Price per unit of the row',
    example: 420,
  })
  @IsPositive()
  @IsNumber()
  pricePerUnit: number;
}

export class CreateInvoiceDTO {
  @ApiProperty({
    description: 'Description of the invoice',
  })
  @IsString()
  @IsOptional()
  @Length(0, 4096)
  readonly description: string = '';

  @ApiProperty({
    description: 'The customer id that will pay the invoice',
  })
  @IsNumber()
  readonly customerId: number;

  @ApiProperty({
    description: 'Rows of the invoice',
  })
  @ValidateNested({ each: true })
  @Type(() => InvoiceRowDTO)
  @ArrayNotEmpty()
  readonly rows: InvoiceRowDTO[];
}

export class ValidateInvoiceDto {
  @IsPositive()
  @ApiProperty({
    description: 'The id of the invoice to set to unpaid',
    example: 1234,
  })
  readonly invoiceId: number;
}

export class GetInvoicesQueryDto extends PaginationIgnoreDto {
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @IsOptional()
  readonly userId?: number;

  @IsEnum(INVOICE_STATUS)
  @IsOptional()
  readonly status?: INVOICE_STATUS;
}
