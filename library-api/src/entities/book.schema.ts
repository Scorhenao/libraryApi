import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author, Book } from 'src/common/interfaces';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class BookEntity implements Book {
  @Prop({ default: uuidv4 })
  uuid: string;

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
