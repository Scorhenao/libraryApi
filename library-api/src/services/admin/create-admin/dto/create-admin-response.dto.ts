import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponseDto {
  @ApiProperty({ description: 'ID of the created admin' })
  _id: string;

  @ApiProperty({ description: 'Name of the administrador' })
  name: string;

  @ApiProperty({ description: 'Email of the administrator' })
  email: string;
}
