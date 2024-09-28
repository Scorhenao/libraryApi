import { AuthorSchema, AuthorEntity } from './../../entities/author.schema';
import { CreateAuthorService } from './create-author/create-autho.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsController } from './authors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthorEntity.name, schema: AuthorSchema },
    ]),
  ],
  controllers: [AuthorsController],
  providers: [CreateAuthorService],
})
export class AuthorsModule {}
