import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument, BookEntity } from 'src/entities/book.schema';
import { AuthorDocument, AuthorEntity } from 'src/entities/author.schema'; // Asegúrate de importar AuthorDocument

@Injectable()
export class UpdateBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
    @InjectModel(AuthorEntity.name) private authorModel: Model<AuthorDocument>, // Asegúrate de inyectar el modelo del autor
  ) {}

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    if (updateBookDto.titulo) {
      book.titulo = updateBookDto.titulo;
    }
    if (updateBookDto.author) {
      const author = await this.authorModel
        .findById(updateBookDto.author)
        .exec(); // Busca el autor por ID
      if (!author) {
        throw new NotFoundException('Autor no encontrado'); // Manejo de errores
      }
      book.author = author; // Asigna el objeto de autor
    }
    if (updateBookDto.publicatedAt) {
      book.publicatedAt = updateBookDto.publicatedAt;
    }
    if (updateBookDto.genre) {
      book.genre = updateBookDto.genre;
    }

    return book.save();
  }
}
