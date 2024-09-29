import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from './create-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookEntity } from 'src/entities/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

const mockBook = {
  uuid: 'mock-uuid',
  titulo: 'Test Book',
  author: {
    id: 'mock-author-uuid',
    name: 'Author Name',
    lastName: 'Author LastName',
  },
  publicatedAt: new Date('2022-01-01'),
  genre: 'Fiction',
};

const mockBookModel = {
  create: jest.fn().mockImplementation((dto) => {
    return {
      ...dto,
      save: jest.fn().mockResolvedValue(mockBook),
    };
  }),
  // Simular el constructor
  new: jest.fn().mockImplementation(function (dto) {
    Object.assign(this, dto);
    this.save = jest.fn().mockResolvedValue(mockBook);
  }),
};

describe('CreateBookService', () => {
  let service: CreateBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookService,
        {
          provide: getModelToken(BookEntity.name),
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
          id: 'mock-author-uuid',
          name: 'Author Name',
          lastName: 'Author LastName',
        },
        publicatedAt: new Date('2022-01-01'),
        genre: 'Fiction',
      };

      const result = await service.create(createBookDto);

      expect(result).toEqual(mockBook);
      expect(mockBookModel.create).toHaveBeenCalledWith({
        ...createBookDto,
        publicatedAt: expect.any(Date),
      });
    });
  });
});
