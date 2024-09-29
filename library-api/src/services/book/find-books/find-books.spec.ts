import { Test, TestingModule } from '@nestjs/testing';
import { FindBooksService } from './find-books.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookEntity } from 'src/entities/book.schema';
import { NotFoundException } from '@nestjs/common';

const mockBookModel = {
  find: jest.fn(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

describe('FindBooksService', () => {
  let service: FindBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindBooksService,
        {
          provide: getModelToken(BookEntity.name), // Cambiado para usar el nombre de BookEntity
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<FindBooksService>(FindBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of books', async () => {
      const books = [
        {
          titulo: 'Test Book',
          author: 'Author ID',
          publicatedAt: new Date(),
          genre: 'Fiction',
        },
      ];
      mockBookModel.find.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue(books);

      const result = await service.findAll({ page: 1, limit: 10 });
      expect(result).toEqual(books);
      expect(mockBookModel.find).toHaveBeenCalledWith({});
    });

    it('should throw NotFoundException if no books are found', async () => {
      mockBookModel.find.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue([]);

      await expect(service.findAll({ page: 1, limit: 10 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should filter books by author', async () => {
      const books = [
        {
          titulo: 'Test Book',
          author: 'Author ID',
          publicatedAt: new Date(),
          genre: 'Fiction',
        },
      ];
      mockBookModel.find.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue(books);

      const result = await service.findAll({
        page: 1,
        limit: 10,
        author: 'Author ID',
      });
      expect(result).toEqual(books);
      expect(mockBookModel.find).toHaveBeenCalledWith({ author: 'Author ID' });
    });

    it('should filter books by genre', async () => {
      const books = [
        {
          titulo: 'Test Book',
          author: 'Author ID',
          publicatedAt: new Date(),
          genre: 'Fiction',
        },
      ];
      mockBookModel.find.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue(books);

      const result = await service.findAll({
        page: 1,
        limit: 10,
        genre: 'Fiction',
      });
      expect(result).toEqual(books);
      expect(mockBookModel.find).toHaveBeenCalledWith({ genre: 'Fiction' });
    });
  });
});
