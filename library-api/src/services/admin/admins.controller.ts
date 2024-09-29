import { Controller, Post, Body } from '@nestjs/common';
import { CreateAdminDto } from './create-admin/dto/create-admin.dto';
import { CreateAdminService } from './create-admin/create-admin.service';
import { CreateAdminResponseDto } from './create-admin/dto/create-admin-response.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminsController {
  constructor(private readonly createAdminService: CreateAdminService) {}

  @Post('create')
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'El administrador ha sido creado exitosamente',
    type: CreateAdminResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El administrador ya está registrado',
  })
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<CreateAdminResponseDto> {
    return this.createAdminService.create(createAdminDto);
  }
}
