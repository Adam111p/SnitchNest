import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
  IsDate,
} from 'class-validator';
import { LogLevel } from 'generated/prisma/enums';

export class CreateLogEventDto {
  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsEnum(LogLevel)
  @IsOptional()
  level?: LogLevel;

  @IsString()
  @MaxLength(100) // Nasz bezpiecznik dla nazwy serwisu
  serviceName!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  podName?: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsOptional()
  @IsDate() //"2026-04-03T12:00:00Z"
  @Type(() => Date) // z domyślną datą, byłby to czas zapisu a nie logu , a le gdyby daty nie było dobrze żeby była chociaż data zapisu.
  createdAt?: Date;
}
