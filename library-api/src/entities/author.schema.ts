import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Author } from 'src/common/interfaces';
import { v4 as uuidv4 } from 'uuid';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class AuthorEntity implements Author {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity);
