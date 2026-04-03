import { IsOptional, IsDateString, IsEnum, IsInt, Min } from 'class-validator';
import { LogLevel } from 'generated/prisma/enums';
import { Transform, Type } from 'class-transformer';

export class LogQueryDto {
  @IsOptional()
  serviceName?: string;

  @IsOptional()
  @IsDateString() // Waliduje, czy string to poprawny format ISO
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }): LogLevel | undefined => {
    if (value === '' || value === 'null') {
      return undefined;
    }
    return value as LogLevel;
  })
  @IsEnum(LogLevel) // <--- Waliduje czy string pasuje do obiektu LogLevel
  level?: LogLevel;

  @Type(() => Number) // <--- To jest klucz do sukcesu
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number) // <--- Tutaj też
  @IsInt()
  @Min(1)
  pageSize: number = 10;
}
