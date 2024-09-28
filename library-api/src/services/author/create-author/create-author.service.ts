import {
  AuthorEntity,
  AuthorDocument,
} from '../../../entities/author.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class CreateAuthorService {
  constructor(
    @InjectModel(AuthorEntity.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(createAuthorDto);
    return createdAuthor.save();
  }
}
