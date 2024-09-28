import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument, BookEntity } from 'src/entities/book.schema';

@Injectable()
export class DeleteBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
  ) {}

  async delete(id: string): Promise<void> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    await this.bookModel.findByIdAndDelete(id).exec();
  }
}
