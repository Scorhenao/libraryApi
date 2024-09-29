import { AdminsController } from './admins.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // o TypeORM
import { CreateAdminService } from './create-admin/create-admin.service';
import { AdminEntity, AdminSchema } from '../../entities/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminEntity.name, schema: AdminSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [CreateAdminService],
})
export class AdminModule {}
