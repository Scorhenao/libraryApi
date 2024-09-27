import { BooksController } from './../books.controller';
import { CreateBookService } from './create-book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: CreateBookService;

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
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<CreateBookService>(CreateBookService);
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

      jest.spyOn(service, 'create').mockResolvedValue(createBookDto as any);

      const result = await controller.create(createBookDto);
      expect(result).toEqual(createBookDto);
      expect(service.create).toHaveBeenCalledWith(createBookDto);
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
});
