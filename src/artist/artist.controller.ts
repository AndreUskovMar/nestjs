import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/ArtistDto';
import { Artist } from '@prisma/client';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return await this.artistService.findOne(id);
  }

  @Post()
  async create(@Body() dto: ArtistDto) {
    return await this.artistService.create(dto);
  }
}
