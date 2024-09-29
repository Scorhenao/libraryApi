import { LoginAdminService } from './login-admin/login-admin.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateAdminDto } from './create-admin/dto/create-admin.dto';
import { CreateAdminService } from './create-admin/create-admin.service';
import { CreateAdminResponseDto } from './create-admin/dto/create-admin-response.dto';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginAdminDto } from './login-admin/dto/login-admin.dto';
import { LoginAdminResponseDto } from './login-admin/dto/login-admin-response.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminsController {
  constructor(
    private readonly createAdminService: CreateAdminService,
    private readonly loginAdminService: LoginAdminService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'The admin was created successfully',
    type: CreateAdminResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'The admin is already registered',
  })
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<CreateAdminResponseDto> {
    return this.createAdminService.create(createAdminDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login of the administrador' })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginAdminResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'invalid credentials',
  })
  async login(@Body() loginDto: LoginAdminDto): Promise<LoginAdminResponseDto> {
    return this.loginAdminService.loginAdmin(loginDto);
  }
}
