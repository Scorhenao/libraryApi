import { ApiProperty } from '@nestjs/swagger';

export class DeleteBookResponseDto {
  @ApiProperty({ description: 'Message confirming the deletion of the book' })
  message: string;

  @ApiProperty({ description: 'ID of the deleted book' })
  id: string;
}
