import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from 'src/entities/book.schema';

@Injectable()
export class FindBooksService {
  constructor(
    @InjectModel('BookEntity') private bookModel: Model<BookDocument>,
  ) {}

  async findAll(options: {
    page: number;
    limit: number;
    author?: string;
    genre?: string;
  }): Promise<BookDocument[]> {
    const { page, limit, author, genre } = options;

    const query: any = {};
    if (author) query['author'] = author;
    if (genre) query['genre'] = genre;

    const books = await this.bookModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (books.length === 0) {
      throw new NotFoundException('No hay libros disponibles.');
    }

    return books;
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }
    return book;
  }
}
