import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  // ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  // ApiParam,
  // ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieRequestDto } from './dto/create-movie.dto';
import { MovieResponseDto } from './dto/movie.dto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Получить список фильмов',
    description: 'Возвращает список фильмов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы найдены',
    type: [MovieResponseDto],
  })
  @Get()
  findAll() {
    return [
      { id: 1, name: 'Silent Hill' },
      { id: 2, name: 'Mortal Combat' },
    ];
  }

  @ApiOperation({
    summary: 'Получить фильм по айди',
    description: 'Возвращает фильм по айди',
  })
  // @ApiParam({ name: 'id', type: 'string', description: 'ID фильма' })
  // @ApiQuery({ name: 'year', type: 'number', description: 'Фильтр по году' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации' })
  @ApiOkResponse({ description: 'Фильм найден', type: MovieResponseDto })
  @ApiNotFoundResponse({
    description: 'Фильм не найден',
    example: {
      status: 404,
      message: 'Movie not fount',
      timestamp: '2026-05-19',
      path: '/movie/3',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string, @Query('year') year: number) {
    return { id: 2, name: 'Mortal Combat' };
  }

  @ApiOperation({
    summary: 'Добавить фильм',
    description: 'Добавляет новый фильм к списку',
  })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string', example: 'New Film' },
  //     },
  //   },
  // })
  @Post()
  create(@Body() dto: CreateMovieRequestDto) {
    return dto;
  }
}
