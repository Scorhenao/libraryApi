import { Date } from 'mongoose';
import { Author } from 'src/entities/autor.schema';

export interface Book {
  titulo: string;
  author: Author;
  publicatedAt: Date;
  genre: string;
}
