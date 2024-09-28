import { CreateBookService } from './create-book/create-book.service';
import { BookEntity, BookSchema } from './../../entities/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { FindBooksService } from './find-books/find-books.service';
import { UpdateBookService } from './update-book/update-book.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookSchema }]),
  ],
  providers: [CreateBookService, FindBooksService, UpdateBookService],
  controllers: [BooksController],
  exports: [CreateBookService, FindBooksService, UpdateBookService],
})
export class BooksModule {}
