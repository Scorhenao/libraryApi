import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateAuthorService } from './create-author.service';
import { AuthorEntity } from '../../../entities/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';

describe('CreateAuthorService', () => {
  let service: CreateAuthorService;

  const mockAuthor = {
    name: 'John',
    lastName: 'Doe',
    save: jest.fn().mockResolvedValue(this), // Para que 'save' devuelva el autor creado
  };

  const mockAuthorModel = jest.fn().mockImplementation(() => ({
    // Simula el constructor para crear una instancia de 'Author'
    ...mockAuthor,
    save: mockAuthor.save,
  }));

  const createAuthorDto: CreateAuthorDto = {
    name: 'John',
    lastName: 'Doe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAuthorService,
        {
          provide: getModelToken(AuthorEntity.name),
          useValue: mockAuthorModel,
        },
      ],
    }).compile();

    service = module.get<CreateAuthorService>(CreateAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new author', async () => {
    const result = await service.create(createAuthorDto);

    // Verifica que el constructor del modelo fue llamado con el DTO correcto
    expect(mockAuthorModel).toHaveBeenCalledWith(createAuthorDto);
    // Verifica que se haya llamado el método save
    expect(result.save).toHaveBeenCalled();
    // Verifica que el resultado sea el autor simulado con el ID
    expect(result).toEqual(mockAuthor);
  });
});
