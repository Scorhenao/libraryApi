import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/common/interfaces';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Author ID of the book' })
  @IsString()
  @IsNotEmpty()
  author: Author;

  @ApiProperty({ description: 'Publication date of the book' })
  @IsDateString()
  @IsNotEmpty()
  publicatedAt: string;

  @ApiProperty({ description: 'Genre of the book' })
  @IsString()
  @IsNotEmpty()
  genre: string;
}
