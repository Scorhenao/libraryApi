import { ErrorHandlingInterceptor } from './../../common/interceptors/error-handling.interceptor';
import { FindBooksService } from './find-books/find-books.service';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { CreateBookResponseDto } from './create-book/dto/create-book-response.dto';
import { UpdateBookResponseDto } from './update-book/dto/update-book-response.dto';
import { DeleteBookService } from './delete-book/delete-book.service';
import { DeleteBookResponseDto } from './delete-book/dto/delete-book-response.dto';
import { BookResponseDto } from './find-books/dto/find-all-books-response.dto';

@ApiTags('books')
@UseInterceptors(ErrorHandlingInterceptor) // Aplica el interceptor a todo el controlador
@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly findBooksService: FindBooksService,
    private readonly updateBookService: UpdateBookService,
    private readonly deleteBookService: DeleteBookService,
  ) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    const createdBook = await this.createBookService.create(createBookDto);
    return {
      status: 'success', // Asegúrate de incluir el estado
      data: {
        id: createdBook.id, // ID del libro
        titulo: createdBook.titulo,
        author: createdBook.author._id, // Accede al _id del autor
        publicatedAt: createdBook.publicatedAt,
        genre: createdBook.genre,
      },
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all books',
    type: [BookResponseDto],
  })
  async findAllBooks(): Promise<BookResponseDto[]> {
    const books = await this.findBooksService.findAllBooks();
    return books.map((book) => ({
      id: book._id.toString(),
      titulo: book.titulo,
      author: book.author.name, // Asegúrate de que esto esté correctamente definido
      publicatedAt: book.publicatedAt,
      genre: book.genre,
    }));
  }

  @Get('search')
  @ApiResponse({ status: 200, description: 'List of books', type: [BookDto] })
  @ApiResponse({ status: 404, description: 'There are no books available' })
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
        _id: book.author.toString(),
        name: book.author.name, // Asegúrate de que Author tenga estas propiedades
        lastName: book.author.lastName,
      },
      publicatedAt: book.publicatedAt, // No convertir a string, dejar como Date
      genre: book.genre,
    }));
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Details of book', type: BookDto })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findOne(@Param('id') id: string): Promise<BookDto> {
    const book = await this.findBooksService.findOne(id);

    return {
      titulo: book.titulo,
      author: {
        _id: book.author.toString(),
        name: book.author.name,
        lastName: book.author.lastName,
      },
      publicatedAt: book.publicatedAt, // No convertir a string
      genre: book.genre,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: UpdateBookResponseDto, // Cambia esto para usar el Response DTO
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateBookResponseDto> {
    const updatedBook = await this.updateBookService.update(id, updateBookDto);

    return {
      titulo: updatedBook.titulo,
      author: {
        _id: updatedBook.author._id,
        name: updatedBook.author.name,
        lastName: updatedBook.author.lastName,
      },
      publicatedAt: updatedBook.publicatedAt,
      genre: updatedBook.genre,
    };
  }
  @Delete(':id')
  @HttpCode(204) // Establece el código de estado de respuesta
  @ApiResponse({
    status: 204,
    description: 'Book deleted successfully',
    type: DeleteBookResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async delete(@Param('id') id: string): Promise<DeleteBookResponseDto> {
    await this.deleteBookService.delete(id);
    return {
      message: 'Book deleted successfully',
      id,
    };
  }
}
