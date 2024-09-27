import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/commo.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule, // Solo importa ConfigModule una vez
    CommonModule,
  ],
})
export class AppModule {}
