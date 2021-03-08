import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteLocationDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
