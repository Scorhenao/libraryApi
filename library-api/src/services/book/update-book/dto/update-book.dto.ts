import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/entities/autor.schema';

export class UpdateBookDto {
  @ApiProperty({ description: 'Title of the book', required: false })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({ description: 'Author of the book', required: false })
  @IsOptional()
  author?: Author;

  @ApiProperty({ description: 'Publication date of the book', required: false })
  @IsDateString()
  @IsOptional()
  publicatedAt?: string;

  @ApiProperty({ description: 'Genre of the book', required: false })
  @IsString()
  @IsOptional()
  genre?: string;
}
