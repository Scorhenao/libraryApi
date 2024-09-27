import { FindBooksService } from './find-books/find-books.service'; // Importa el servicio de búsqueda
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookDto } from './find-books/dto/book.dto';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let controller: BooksController;
  let createBookService: CreateBookService;
  let findBooksService: FindBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: CreateBookService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: FindBooksService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    createBookService = module.get<CreateBookService>(CreateBookService);
    findBooksService = module.get<FindBooksService>(FindBooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        titulo: 'Test Book',
        author: 'Author ID',
        publicatedAt: '2022-01-01',
        genre: 'Fiction',
      };

      jest
        .spyOn(createBookService, 'create')
        .mockResolvedValue(createBookDto as any);

      const result = await controller.create(createBookDto);
      expect(result).toEqual(createBookDto);
      expect(createBookService.create).toHaveBeenCalledWith(createBookDto);
    });

    it('should throw a BadRequestException if titulo is missing', async () => {
      const createBookDto: CreateBookDto = {
        titulo: '',
        author: 'Author ID',
        publicatedAt: '2022-01-01',
        genre: 'Fiction',
      };

      await expect(controller.create(createBookDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    // Agrega más pruebas para otros escenarios (por ejemplo, género faltante)
  });

  describe('findAll', () => {
    it('should return a list of books', async () => {
      const booksDto: BookDto[] = [
        {
          titulo: 'Test Book',
          author: 'Author ID',
          publicatedAt: new Date().toISOString(),
          genre: 'Fiction',
        },
      ];
      findBooksService.findAll = jest.fn().mockResolvedValue(booksDto);

      const result = await controller.findAll();
      expect(result).toEqual(booksDto);
      expect(findBooksService.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });

    it('should throw a NotFoundException if no books are found', async () => {
      findBooksService.findAll = jest
        .fn()
        .mockRejectedValue(new NotFoundException('No hay libros disponibles.'));

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });
});
