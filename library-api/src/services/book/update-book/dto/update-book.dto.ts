import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/common/interfaces';

export class UpdateBookDto {
  @ApiProperty({ description: 'Title of the book', required: false })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({ description: 'Author object', required: false })
  @IsOptional()
  author?: Author;

  @ApiProperty({ description: 'Publication date of the book', required: false })
  @IsOptional()
  publicatedAt?: Date; // Cambia esto a Date

  @ApiProperty({ description: 'Genre of the book', required: false })
  @IsString()
  @IsOptional()
  genre?: string;
}
