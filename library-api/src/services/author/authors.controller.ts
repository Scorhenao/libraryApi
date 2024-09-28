import { AuthorDocument } from './../../entities/author.schema';
import { CreateAuthorService } from './create-author/create-autho.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorDto } from './create-author/dto/create-author.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authors') // Etiqueta para organizar en Swagger
@Controller('authors')
export class AuthorsController {
  constructor(private readonly createAuthorService: CreateAuthorService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Author created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDocument> {
    return this.createAuthorService.create(createAuthorDto);
  }
}
