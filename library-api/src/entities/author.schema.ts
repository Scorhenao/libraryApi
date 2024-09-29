import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Author } from 'src/common/interfaces';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class AuthorEntity implements Author {
  @Prop({ type: SchemaTypes.ObjectId })
  yourField: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity);
