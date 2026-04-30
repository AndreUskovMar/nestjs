import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      // take: 1,
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        poster: true,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const { title, releaseYear, isPublic, actorIds } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Один или несколько актёров не найдены');

    return this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        isPublic,
        posterId: undefined,
        poster: undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        ...dto,
      },
    });

    return movie;
  }

  async remove(id: string): Promise<boolean> {
    const movie = await this.findById(id);

    await this.prismaService.movie.delete({
      where: {
        id: movie.id,
      },
    });

    return true;
  }
}
