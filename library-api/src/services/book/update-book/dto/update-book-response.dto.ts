import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/common/interfaces'; // Asegúrate de importar correctamente la interfaz Author

export class UpdateBookResponseDto {
  @ApiProperty({ description: 'Title of the book' })
  titulo: string;

  @ApiProperty({ description: 'Author object' })
  author: Author; // Define aquí cómo quieres que sea el objeto Author

  @ApiProperty({ description: 'Publication date of the book' })
  publicatedAt: Date;

  @ApiProperty({ description: 'Genre of the book' })
  genre: string;
}
