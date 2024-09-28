import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/common/interfaces';

export class BookDto {
  @ApiProperty({ description: 'Title of the book' })
  titulo: string;

  @ApiProperty({ description: 'Author ID of the book' })
  author: Author; // Este debe ser un string (ID del autor)

  @ApiProperty({ description: 'Publication date of the book' })
  publicatedAt: string; // Cambia esto a string si lo estás manejando como fecha en formato ISO

  @ApiProperty({ description: 'Genre of the book' })
  genre: string;
}
