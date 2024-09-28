import { IsString, IsNotEmpty, IsDate } from 'class-validator';
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
  @IsDate()
  @IsNotEmpty()
  publicatedAt: Date;

  @ApiProperty({ description: 'Genre of the book' })
  @IsString()
  @IsNotEmpty()
  genre: string;
}
