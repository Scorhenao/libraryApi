import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from './autor.schema'; // Asegúrate de que la ruta sea correcta
import { Book } from 'src/common/interfaces';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class BookEntity implements Book {
  @Prop()
  titulo: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Referencia a Author
  })
  author: Author; // Cambiar a Author

  @Prop()
  publicatedAt: string;

  @Prop()
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);
