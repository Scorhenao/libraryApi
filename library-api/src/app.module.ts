import { CommonModule } from './common/commo.module';
import { Module } from '@nestjs/common';
import { BooksModule } from './services/book/books.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlingInterceptor } from './common/interceptors/error-handling.interceptor';
import { ConfigurationModule } from './config/config.module';
import { AuthorsModule } from './services/author/authors.module';

@Module({
  imports: [
    ConfigurationModule, // Esto ya incluye ConfigModule
    CommonModule,
    BooksModule,
    AuthorsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlingInterceptor,
    },
  ],
})
export class AppModule {}
