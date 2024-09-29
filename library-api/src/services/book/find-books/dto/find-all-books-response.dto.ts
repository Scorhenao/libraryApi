import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({ description: 'ID of the book' })
  id: string;

  @ApiProperty({ description: 'Title of the book' })
  titulo: string;

  @ApiProperty({ description: 'Author of the book' })
  author: string;

  @ApiProperty({ description: 'Publication date of the book' })
  publicatedAt: Date;

  @ApiProperty({ description: 'Genre of the book' })
  genre: string;
}
