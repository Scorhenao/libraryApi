import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga el archivo .env
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class ConfigModule {}
