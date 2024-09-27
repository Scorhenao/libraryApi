import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/commo.module';
import { Module } from '@nestjs/common';
import { BooksModule } from './services/book/books.module';
import databaseConfig from './config/database.config';
import { ConfigurationModule } from './config/config.module';

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
})
export class AppModule {}
