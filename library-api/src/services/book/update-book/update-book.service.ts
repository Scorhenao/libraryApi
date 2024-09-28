import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument, BookEntity } from 'src/entities/book.schema';

@Injectable()
export class UpdateBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
  ) {}

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    // Actualización condicional de los campos
    if (updateBookDto.titulo) {
      book.titulo = updateBookDto.titulo;
    }
    if (updateBookDto.author) {
      book.author = updateBookDto.author;
    }
    if (updateBookDto.publicatedAt) {
      book.publicatedAt = updateBookDto.publicatedAt; // Asigna como Date directamente
    }
    if (updateBookDto.genre) {
      book.genre = updateBookDto.genre;
    }

    return book.save();
  }
}
