import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'Jwt access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...',
  })
  accessToken: string;
}
