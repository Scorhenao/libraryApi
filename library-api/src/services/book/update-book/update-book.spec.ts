import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBookService } from './update-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookEntity } from 'src/entities/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

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
  save: jest.fn().mockResolvedValue(mockBook),
};

// Definimos el mock del modelo
const mockBookModel = {
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
};

describe('UpdateBookService', () => {
  let service: UpdateBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBookService,
        {
          provide: getModelToken(BookEntity.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<UpdateBookService>(UpdateBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update a book and return it', async () => {
      const updateBookDto: UpdateBookDto = {
        titulo: 'Updated Title',
        author: {
          id: 'mock-author-uuid',
          name: 'Updated Author Name',
          lastName: 'Updated Author LastName',
        },
        publicatedAt: new Date('2023-01-01'),
        genre: 'Updated Genre',
      };

      const result = await service.update('mock-uuid', updateBookDto);

      expect(result).toEqual({
        ...mockBook,
        ...updateBookDto,
      });
      expect(mockBookModel.findById).toHaveBeenCalledWith('mock-uuid');
      expect(mockBook.save).toHaveBeenCalled();
    });
  });
});
