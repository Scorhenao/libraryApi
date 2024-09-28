import { Author } from './author.interface';
export interface Book {
  titulo: string;
  author: Author; // Se mantiene como objeto Author
  publicatedAt: Date; // Date de JavaScript
  genre: string;
}
