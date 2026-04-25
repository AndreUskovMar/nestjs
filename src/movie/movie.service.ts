import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll() {
    return await this.movieRepository.find({
      // where: { isPublic: true },
      order: { createdAt: 'DESC' },
      relations: ['actors'],
      // take: 1,
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const { title, releaseYear, isPublic, actorIds } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Один или несколько актёров не найдены');

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      isPublic,
      actors,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);

    return await this.movieRepository.save(movie);
  }

  async remove(id: string): Promise<boolean> {
    const movie = await this.findById(id);

    await this.movieRepository.remove(movie);

    return true;
  }
}
