import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidV4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

const artistId = uuidV4();

const artistDto = {
  name: 'Phillip Kirkorov',
  genre: 'Pop',
};

const artist = {
  id: artistId,
  ...artistDto,
};

describe('Artist Controller', () => {
  let controller: ArtistController;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([artist]),
            findOne: jest.fn().mockResolvedValue(artist),
            create: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be an array of artist', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([artist]);
  });

  it('should be a single artist by id', async () => {
    const result = await controller.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw an exception if artist is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException('Artist not found'));

    try {
      await controller.findOne('123456');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Artist not found');
    }
  });

  it('should create an artist', async () => {
    const result = await controller.create(artistDto);
    expect(result).toEqual(artist);
  });
});
