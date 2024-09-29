import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity, AdminDocument } from '../../../entities/admin.schema';
import * as bcrypt from 'bcryptjs';
import { CreateAdminResponseDto } from './dto/create-admin-response.dto';

@Injectable()
export class CreateAdminService {
  constructor(
    @InjectModel(AdminEntity.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(
    createAdminDto: CreateAdminDto,
  ): Promise<CreateAdminResponseDto> {
    const { name, email, password } = createAdminDto;

    // Verificar si el email ya existe
    const existingAdmin = await this.adminModel.findOne({ email });
    if (existingAdmin) {
      throw new BadRequestException('Administrator already registered');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo admin
    const newAdmin = new this.adminModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    // Devolver solo los campos que queremos mostrar
    return {
      _id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
    };
  }
}
