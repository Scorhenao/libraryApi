import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/common/interfaces';

export class UpdateBookDto {
  @ApiProperty({ description: 'Title of the book', required: false })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({ description: 'Author object', required: false })
  @IsOptional()
  author?: Author; // Mantener como Author

  @ApiProperty({ description: 'Publication date of the book', required: false })
  @IsDateString()
  @IsOptional()
  publicatedAt?: Date;

  @ApiProperty({ description: 'Genre of the book', required: false })
  @IsString()
  @IsOptional()
  genre?: string;
}
