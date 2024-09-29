import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminEntity } from '../../../entities/admin.schema';
import { LoginAdminResponseDto } from './dto/login-admin-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Injectable()
@ApiTags('Admin')
export class LoginAdminService {
  constructor(
    @InjectModel(AdminEntity.name)
    private adminModel: Model<AdminEntity>,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Login for Admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully logged in',
    type: LoginAdminResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async loginAdmin(loginDto: LoginAdminDto): Promise<LoginAdminResponseDto> {
    const { email, password } = loginDto;

    // Buscar administrador por email
    const admin = await this.adminModel.findOne({ email });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validar contraseña
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      this.configService.get<string>('JWT_SECRET'),
      {
        expiresIn: '1h',
      },
    );

    const response: LoginAdminResponseDto = {
      token,
      expiresIn: '1h',
    };

    return response;
  }
}
