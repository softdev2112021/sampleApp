import {
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class AddLocationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly coords: [number, number];
}
