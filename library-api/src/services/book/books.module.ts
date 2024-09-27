import { CreateBookService } from './create-book/create-book.service';
import { BookEntity, BookSchema } from './../../entities/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookSchema }]),
  ],
  providers: [CreateBookService],
  controllers: [BooksController],
  exports: [CreateBookService],
})
export class BooksModule {}
