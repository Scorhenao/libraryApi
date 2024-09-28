import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from './create-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';

const mockBook = {
  uuid: 'mock-uuid',
  titulo: 'Test Book',
  author: {
    id: 'Author ID',
    name: 'Author Name',
    lastName: 'Author LastName',
  },
  publicatedAt: new Date('2022-01-01'),
  genre: 'Fiction',
};

const mockBookModel = {
  create: jest.fn().mockResolvedValue(mockBook),
  save: jest.fn().mockResolvedValue(mockBook),
};

describe('CreateBookService', () => {
  let service: CreateBookService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        titulo: 'Test Book',
        author: {
          id: 'Author ID',
          name: 'Author Name',
          lastName: 'Author LastName',
        },
        publicatedAt: '2022-01-01',
        genre: 'Fiction',
      };

      const result = await service.create(createBookDto);

      expect(result).toEqual(mockBook);
      expect(mockBookModel.create).toHaveBeenCalledWith(createBookDto);
    });

    it('should throw an error if the author does not exist', async () => {
      // Puedes simular la validación de un autor aquí si decides implementarla más tarde.
    });
  });
});
