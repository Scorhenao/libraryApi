import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Admin } from 'src/common/interfaces';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class AdminEntity implements Admin {
  @Prop({ type: SchemaTypes.ObjectId })
  yourField: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminEntity);
