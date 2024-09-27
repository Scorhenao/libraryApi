import { FindBooksService } from './find-books/find-books.service';
import { Book } from 'src/common/interfaces';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './find-books/dto/book.dto';

@ApiTags('books') // Categoriza el endpoint
@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly findBooksService: FindBooksService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: CreateBookDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    if (!createBookDto.titulo) {
      throw new BadRequestException('El título es obligatorio.');
    }
    if (!createBookDto.genre) {
      throw new BadRequestException('El genero es obligatorio.');
    }
    return this.createBookService.create(createBookDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de libros', type: [BookDto] })
  @ApiResponse({ status: 404, description: 'No hay libros disponibles' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
  ): Promise<BookDto[]> {
    const books = await this.findBooksService.findAll({
      page,
      limit,
      author,
      genre,
    });

    return books.map((book) => ({
      titulo: book.titulo,
      author: book.author.toString(), // Asegúrate de que esto sea un string
      publicatedAt:
        book.publicatedAt instanceof Date
          ? book.publicatedAt.toISOString()
          : book.publicatedAt.toString(), // Siempre devuelve un string
      genre: book.genre, // Asignación directa
    }));
  }
}
