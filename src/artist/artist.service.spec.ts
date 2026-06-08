import { v4 as uuidV4 } from 'uuid';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';

const artistId = uuidV4();

const artists = [
  { id: artistId, name: 'Phillip Kirkorov', genre: 'Pop' },
  { id: uuidV4(), name: 'Eminem', genre: 'Rap' },
  { id: uuidV4(), name: 'Valeriy Kipelov', genre: 'Metal' },
];

const artist = artists[0];

const artistDto = {
  name: artist.name,
  genre: artist.genre,
};

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('Artist Service', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be an array of artist', async () => {
    const result = await service.findAll();
    expect(result).toEqual(artists);
  });

  it('should be a single artist by id', async () => {
    const result = await service.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should create an artist', async () => {
    const result = await service.create(artistDto);
    expect(result).toEqual(artist);
  });
});
