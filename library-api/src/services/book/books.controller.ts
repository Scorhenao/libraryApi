import { ErrorHandlingInterceptor } from './../../common/interceptors/error-handling.interceptor';
import { FindBooksService } from './find-books/find-books.service';
import { Book } from 'src/common/interfaces';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './find-books/dto/book.dto';
import { UseInterceptors } from '@nestjs/common';

@ApiTags('books')
@UseInterceptors(ErrorHandlingInterceptor) // Aplica el interceptor a todo el controlador
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
      author: book.author.toString(),
      publicatedAt:
        book.publicatedAt instanceof Date
          ? book.publicatedAt.toISOString()
          : book.publicatedAt.toString(),
      genre: book.genre,
    }));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalles del libro',
    type: BookDto,
  })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async findOne(@Param('id') id: string): Promise<BookDto> {
    const book = await this.findBooksService.findOne(id);

    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    return {
      titulo: book.titulo,
      author: book.author.toString(),
      publicatedAt:
        book.publicatedAt instanceof Date
          ? book.publicatedAt.toISOString()
          : String(book.publicatedAt),
      genre: book.genre,
    };
  }
}
