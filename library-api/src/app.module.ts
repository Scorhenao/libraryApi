import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/commo.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), CommonModule, ConfigModule],
})
export class AppModule {}
