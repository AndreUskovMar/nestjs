import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

const artistDto = {
  name: 'Phillip Kirkorov',
  genre: 'Pop',
};

describe('ArtistController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.artist.deleteMany();
    await app.close();
  });

  it('/artists (POST) - should create new artist', async () => {
    const response = await request(app.getHttpServer())
      .post('/artists')
      .send(artistDto)
      .expect(201);

    expect(response.body).toMatchObject(artistDto);
    expect(response.body).toHaveProperty('id');
  });

  it('/artists/:id (GET) - should return 404 Not found exception', async () => {
    await request(app.getHttpServer())
      .get('/artists/not-existing-id')
      .expect(404);
  });

  it('/artists/:id (GET) - should get artist by id', async () => {
    const created = await request(app.getHttpServer())
      .post('/artists')
      .send(artistDto)
      .expect(201);

    const id = created.body.id;

    const response = await request(app.getHttpServer())
      .get(`/artists/${id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: id,
      name: artistDto.name,
      genre: artistDto.genre,
    });
  });
});
