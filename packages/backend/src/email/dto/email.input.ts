import { IsString } from 'class-validator';

export class EmailInputDto {
  @IsString()
  readonly to: string;

  @IsString()
  readonly subject: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly html: string;
}
