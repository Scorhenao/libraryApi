import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorResponseDto {
  @ApiProperty({ description: 'ID of the created author' })
  _id: string;

  @ApiProperty({ description: 'Name of the author' })
  name: string;

  @ApiProperty({ description: 'Last name of the author' })
  lastName: string;
}
