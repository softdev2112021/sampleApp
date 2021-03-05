import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteLocationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
