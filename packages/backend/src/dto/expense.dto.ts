import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpsertExpenseDTO {
  @ApiProperty({
    description: 'Description of the expense',
  })
  @IsString()
  @Length(0, 4096)
  readonly description: string = '';
}
