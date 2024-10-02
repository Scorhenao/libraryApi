import { DeleteBookService } from './delete-book/delete-book.service';
import { AuthorsModule } from './../author/authors.module';
import { CreateBookService } from './create-book/create-book.service';
import { BookEntity, BookSchema } from './../../entities/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { FindBooksService } from './find-books/find-books.service';
import { UpdateBookService } from './update-book/update-book.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookSchema }]),
    AuthorsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    CreateBookService,
    FindBooksService,
    UpdateBookService,
    DeleteBookService,
  ],
  controllers: [BooksController],
  exports: [
    CreateBookService,
    FindBooksService,
    UpdateBookService,
    DeleteBookService,
  ],
})
export class BooksModule {}
