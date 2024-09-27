import { IsString, IsNumber } from 'class-validator';

export class ErrorResponseDto {
  @IsNumber()
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  error: string;
}
