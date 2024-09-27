import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument, BookEntity } from 'src/entities/book.schema';
//import { AuthorService } from '../author/author.service'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class CreateBookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
    //private authorService: AuthorService, // Inyecta el servicio de autores
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    // Verifica si el autor existe
    //const authorExists = await this.authorService.findById(
    //createBookDto.author,
    //);
    //if (!authorExists) {
    //throw new BadRequestException('El autor no existe.');
    //}

    const createdBook = new this.bookModel({
      ...createBookDto,
      publicatedAt: new Date(createBookDto.publicatedAt), // Asegúrate de que este valor sea válido
    });
    return createdBook.save();
  }
}
