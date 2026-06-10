import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';
import { ArtistResponse } from './interfaces/artist-response.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenExpired: number = 0;

  private readonly SPOTIFY_CLIENT_ID: string;
  private readonly SPOTIFY_CLIENT_SECRET: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.SPOTIFY_CLIENT_ID =
      configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    this.SPOTIFY_CLIENT_SECRET = configService.getOrThrow<string>(
      'SPOTIFY_CLIENT_SECRET',
    );
  }

  async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<ArtistResponse>(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      ),
    );

    return response.data;
  }

  private async authenticate() {
    if (this.accessToken && this.tokenExpired > Date.now()) {
      return;
    }

    const creds = Buffer.from(
      `${this.SPOTIFY_CLIENT_ID}:${this.SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: 'Basic ' + creds,
            ContentType: 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenExpired = Date.now() + response.data.expires_in * 1000;
  }
}
