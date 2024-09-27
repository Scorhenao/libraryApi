import { Author } from 'src/entities/autor.schema';

export interface Book {
  titulo: string;
  author: Author;
  publicatedAt: string;
  genre: string;
}
