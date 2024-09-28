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
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './find-books/dto/book.dto';
import { UseInterceptors } from '@nestjs/common';
import { UpdateBookDto } from './update-book/dto/update-book.dto';
import { UpdateBookService } from './update-book/update-book.service';

@ApiTags('books')
@UseInterceptors(ErrorHandlingInterceptor) // Aplica el interceptor a todo el controlador
@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly findBooksService: FindBooksService,
    private readonly updateBookService: UpdateBookService,
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
      throw new BadRequestException('the title is required.');
    }
    if (!createBookDto.genre) {
      throw new BadRequestException('El genre is required.');
    }
    return this.createBookService.create(createBookDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'list of books', type: [BookDto] })
  @ApiResponse({ status: 404, description: 'there are not books available' })
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
      author: {
        id: book.author.toString(),
        name: book.author.name,
        lastName: book.author.lastName,
      },
      publicatedAt: book.publicatedAt.toISOString(),
      genre: book.genre,
    }));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'details of book',
    type: BookDto,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findOne(@Param('id') id: string): Promise<BookDto> {
    const book = await this.findBooksService.findOne(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      titulo: book.titulo,
      author: {
        id: book.author.toString(), // Asumiendo que tienes el ID del autor
        name: book.author.name, // Asegúrate de que Author tenga estas propiedades
        lastName: book.author.lastName,
      },
      publicatedAt: book.publicatedAt.toISOString(),
      genre: book.genre,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: BookDto,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookDto> {
    const updatedBook = await this.updateBookService.update(id, updateBookDto);

    return {
      titulo: updatedBook.titulo,
      author: {
        id: updatedBook.author.toString(), // Asumiendo que tienes un ID del autor
        name: updatedBook.author.name, // Asegúrate de que estas propiedades existan
        lastName: updatedBook.author.lastName,
      },
      publicatedAt: updatedBook.publicatedAt.toISOString(),
      genre: updatedBook.genre,
    };
  }
}
