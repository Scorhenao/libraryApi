import { Book } from 'src/common/interfaces';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books') // Categoriza el endpoint
@Controller('books')
export class BooksController {
  constructor(private readonly createBookService: CreateBookService) {}

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
}
