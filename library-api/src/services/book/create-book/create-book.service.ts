import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument, BookEntity } from 'src/entities/book.schema';

@Injectable()
export class CreateBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      publicatedAt: new Date(createBookDto.publicatedAt), // Asegúrate de convertir el string a Date aquí
    });
    return createdBook.save();
  }
}
