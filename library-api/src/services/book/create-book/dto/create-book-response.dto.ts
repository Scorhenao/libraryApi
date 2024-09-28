import { ApiProperty } from '@nestjs/swagger';

export class CreateBookResponseDto {
  @ApiProperty({ description: 'Status of the response' })
  status: string;

  @ApiProperty({ description: 'Data of the created book' })
  data: {
    id: string; // ID del libro
    titulo: string;
    author: string; // Aquí el ID del autor, que es _id en MongoDB
    publicatedAt: Date; // O string, según lo que decidas
    genre: string;
  };
}
