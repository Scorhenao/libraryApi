import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponseDto {
  @ApiProperty({ description: 'ID of the created admin' })
  _id: string;

  @ApiProperty({ description: 'Name of the administrador' })
  name: string;

  @ApiProperty({ description: 'Email of the administrator' })
  email: string;

  @ApiProperty({ description: 'Password of the administrator' })
  password: string;

  @ApiProperty({ description: 'Role of the administrator' })
  role: string;
}
