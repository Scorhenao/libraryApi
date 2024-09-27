import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class BookEntity implements BookInterface {
  @Prop()
  titulo: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop()
  publicatedAt: string;

  @Prop()
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
