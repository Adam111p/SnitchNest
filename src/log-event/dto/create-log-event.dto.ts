import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
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
}
