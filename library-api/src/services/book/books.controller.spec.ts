import { FindBooksService } from './find-books/find-books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookDto } from './find-books/dto/book.dto';
import { CreateBookDto } from './create-book/dto/create-book.dto';
import { CreateBookService } from './create-book/create-book.service';
import { UpdateBookDto } from './update-book/dto/update-book.dto';
import { UpdateBookService } from './update-book/update-book.service';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let controller: BooksController;
  let createBookService: CreateBookService;
  let findBooksService: FindBooksService;
  let updateBookService: UpdateBookService;

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
        {
          provide: UpdateBookService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    createBookService = module.get<CreateBookService>(CreateBookService);
    findBooksService = module.get<FindBooksService>(FindBooksService);
    updateBookService = module.get<UpdateBookService>(UpdateBookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        titulo: 'Test Book',
        author: {
          id: 'Author ID',
          name: 'Author Name',
          lastName: 'Author LastName',
        }, // Cambia esto a un objeto Author
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
        author: {
          id: 'Author ID',
          name: 'Author Name',
          lastName: 'Author LastName',
        },
        publicatedAt: '2022-01-01',
        genre: 'Fiction',
      };

      await expect(controller.create(createBookDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of books', async () => {
      const booksDto: BookDto[] = [
        {
          titulo: 'Test Book',
          author: {
            id: 'Author ID',
            name: 'Author Name',
            lastName: 'Author LastName',
          },
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

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        titulo: 'Updated Book',
        author: {
          id: 'Author ID',
          name: 'Author Name',
          lastName: 'Author LastName',
        },
        publicatedAt: '2022-01-01',
        genre: 'Updated Genre',
      };

      const updatedBook = {
        ...updateBookDto,
        save: jest.fn().mockResolvedValue(updateBookDto),
      };

      jest
        .spyOn(updateBookService, 'update')
        .mockResolvedValue(updatedBook as any);

      const result = await controller.update('bookId', updateBookDto);
      expect(result).toEqual(updatedBook);
      expect(updateBookService.update).toHaveBeenCalledWith(
        'bookId',
        updateBookDto,
      );
    });

    it('should throw a NotFoundException if the book does not exist', async () => {
      const updateBookDto: UpdateBookDto = {
        titulo: 'Updated Book',
        author: {
          id: 'Author ID',
          name: 'Author Name',
          lastName: 'Author LastName',
        },
        publicatedAt: '2022-01-01',
        genre: 'Updated Genre',
      };

      jest
        .spyOn(updateBookService, 'update')
        .mockRejectedValue(new NotFoundException('Libro no encontrado'));

      await expect(controller.update('bookId', updateBookDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
