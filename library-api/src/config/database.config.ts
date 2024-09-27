import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseConfig = MongooseModule.forRoot('mongodb://localhost/nest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
