import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config'; // Renombrado
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NestConfigModule.forRoot({
      // Usa el nombre renombrado
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigurationModule {} // Renombrado
