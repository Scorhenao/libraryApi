import { Author } from 'src/entities/autor.schema';

export interface Book {
  titulo: string;
  author: Author; // Se mantiene como objeto Author
  publicatedAt: Date; // Date de JavaScript
  genre: string;
}
