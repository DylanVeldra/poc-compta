import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { toNumber } from '@utils/functions/toNumber';
import { PaginationIgnoreDto } from '@utils/pipes/pagination';
import { INVOICE_STATUS } from '@prisma/client';

export class InvoiceRowDTO {
  @ApiProperty({
    description: "The type of the invoice's row",
    example: 'service',
  })
  @IsString()
  @Length(1, 256)
  type: string;

  @ApiProperty({
    description: "The description of the invoice's row",
    example: 'Backend development',
  })
  @IsString()
  @Length(1, 512)
  description: string;

  @ApiProperty({
    description: 'The quantity of the row',
    example: 1,
  })
  @IsPositive()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Price per unit of the row',
    example: 420,
  })
  @IsPositive()
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({
    description: 'Price per unit of the row',
    example: 420,
  })
  @IsPositive()
  @Min(0)
  @Max(0)
  @IsNumber()
  discount: number = 0;
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
    description:
      'The account bank id that will receivement the paiement of the invoice',
  })
  @IsNumber()
  readonly accountBankId: number;

  @ApiProperty({
    description: 'The dueDate to pay the invoice',
  })
  @IsDate()
  readonly dueDate: Date;

  @ApiProperty({
    description: 'The currency to pay the invoice',
  })
  @IsString()
  readonly currency: string;

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
  @IsEnum(INVOICE_STATUS)
  @IsOptional()
  readonly status?: INVOICE_STATUS;
}
