import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieRequestDto {
  @ApiProperty({
    description: 'Название фильма',
    example: 'New Film',
    type: String,
  })
  title: string;
  @ApiProperty({
    description: 'Год создания',
    example: 2000,
    type: Number,
  })
  year: number;
  @ApiPropertyOptional({
    description: 'Ссылка на постер',
    example: 'https://example.com/poster.jpg',
    type: String,
  })
  poster?: string;
  @ApiProperty({
    description: 'ID актёров',
    example: ['1234', '5678'],
    type: [String],
  })
  actorsIds: string[];
}
