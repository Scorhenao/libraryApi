import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author, Book } from 'src/common/interfaces';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class BookEntity implements Book {
  @Prop()
  titulo: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  })
  author: Author;

  @Prop({ type: Date, required: true })
  publicatedAt: Date;

  @Prop()
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);
