import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBookService } from './update-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Author } from 'src/common/interfaces/author.interface'; // Asegúrate de que este sea el path correcto
import { BookEntity } from 'src/entities/book.schema';

const mockBookModel = {
  findById: jest.fn(),
  exec: jest.fn(),
  save: jest.fn(),
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
      // Declara mockBook antes de usarlo
      const mockBook = {
        titulo: 'Old Title',
        author: {
          id: 'Old Author ID',
          name: 'Old Author Name',
          lastName: 'Old Author LastName',
        } as Author,
        publicatedAt: new Date('2022-01-01'),
        genre: 'Old Genre',
        save: jest.fn().mockResolvedValue({
          titulo: 'Updated Title',
          author: {
            id: 'Updated Author ID',
            name: 'Updated Author Name',
            lastName: 'Updated Author LastName',
          } as Author,
          publicatedAt: '2023-01-01',
          genre: 'Updated Genre',
        }),
      };

      mockBookModel.findById.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue(mockBook);

      const updateBookDto = {
        titulo: 'Updated Title',
        author: {
          id: 'Updated Author ID',
          name: 'Updated Author Name',
          lastName: 'Updated Author LastName',
        } as Author,
        publicatedAt: '2023-01-01',
        genre: 'Updated Genre',
      };

      const result = await service.update('some-id', updateBookDto);
      expect(result).toEqual({
        ...mockBook,
        ...updateBookDto,
      });
      expect(mockBookModel.findById).toHaveBeenCalledWith('some-id');
      expect(mockBookModel.exec).toHaveBeenCalled(); // Verifica que exec haya sido llamado
      expect(mockBook.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if the book does not exist', async () => {
      mockBookModel.findById.mockReturnValue(mockBookModel);
      mockBookModel.exec.mockResolvedValue(null);

      await expect(service.update('non-existing-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
