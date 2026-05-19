import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({
    description: 'ID фильма',
    example: '123456',
    type: String,
  })
  id: string;
  @ApiProperty({
    description: 'Название фильма',
    example: 'New Film',
    type: String,
  })
  title: string;
}
