// src/services/book/create-book/create-book.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument, BookEntity } from 'src/entities/book.schema';

@Injectable()
export class CreateBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    try {
      const createdBook = new this.bookModel({
        ...createBookDto,
        author: new Types.ObjectId(createBookDto.author), // Convierte author a ObjectId
      });
      return await createdBook.save();
    } catch (error) {
      throw new BadRequestException('Error creating book: ' + error.message);
    }
  }
}
