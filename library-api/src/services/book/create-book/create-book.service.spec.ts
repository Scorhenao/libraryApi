import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from './create-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument } from 'src/entities/book.schema';

const mockBook = {
  uuid: 'mock-uuid',
  titulo: 'Test Book',
  author: 'Author ID',
  publicatedAt: new Date('2022-01-01'),
  genre: 'Fiction',
};

const mockBookModel = {
  new: jest.fn().mockResolvedValue(mockBook),
  constructor: jest.fn().mockResolvedValue(mockBook),
  create: jest.fn(),
  save: jest.fn().mockResolvedValue(mockBook), // Simula el método save
};

describe('CreateBookService', () => {
  let service: CreateBookService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookService,
        {
          provide: getModelToken('BookEntity'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<CreateBookService>(CreateBookService);
    bookModel = module.get<Model<BookDocument>>(getModelToken('BookEntity'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        titulo: 'Test Book',
        author: 'Author ID',
        publicatedAt: '2022-01-01',
        genre: 'Fiction',
      };

      const result = await service.create(createBookDto);

      expect(result).toEqual(mockBook);
      expect(mockBookModel.save).toHaveBeenCalled(); // Verifica si se llamó a save
    });

    it('should throw an error if the author does not exist', async () => {
      // Puedes simular la validación de un autor aquí si decides implementarla más tarde.
    });
  });
});
