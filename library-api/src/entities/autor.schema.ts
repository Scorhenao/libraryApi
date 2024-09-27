import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop()
  lastName: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
