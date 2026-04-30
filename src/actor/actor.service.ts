import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Actor } from '@prisma/client';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    return this.prismaService.actor.create({
      data: {
        name: dto.name,
      },
    });
  }
}
