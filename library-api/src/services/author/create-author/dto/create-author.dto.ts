import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Name of the author' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Last name of the author' })
  @IsNotEmpty()
  lastName: string;
}
