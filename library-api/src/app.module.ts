import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/commo.module';
import { Module } from '@nestjs/common';
import { BooksModule } from './services/book/books.module';
import databaseConfig from './config/database.config';
import { ConfigurationModule } from './config/config.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlingInterceptor } from './common/interceptors/error-handling.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    ConfigurationModule,
    CommonModule,
    BooksModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlingInterceptor,
    },
  ],
})
export class AppModule {}
