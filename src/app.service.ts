import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';

@Injectable()
export class AppService {
  constructor(private readonly spotifyService: SpotifyService) {}

  async getArtist(id: string) {
    return await this.spotifyService.getArtist(id);
  }
}
