import { IsString, MaxLength } from 'class-validator';

export class AddForecastDto {
  @IsString()
  readonly name: string;

  @MaxLength(2, {
    each: true,
  })
  readonly coords: [number, number];
}
