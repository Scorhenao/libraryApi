import { CreateBookService } from './create-book/create-book.service';
import { BookEntity, BookSchema } from './../../entities/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { FindBooksService } from './find-books/find-books.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookSchema }]),
  ],
  providers: [CreateBookService, FindBooksService],
  controllers: [BooksController],
  exports: [CreateBookService],
})
export class BooksModule {}
