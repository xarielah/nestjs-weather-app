import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather(location: {
    lon: string | number;
    lat: string | number;
  }): Promise<any> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('lat', location.lat.toString());
      searchParams.append('lon', location.lon.toString());

      const data = await fetch(
        this.configService.get('apiUrl') + searchParams.toString(),
      );
      const json = await data.json();
      console.log('🚀 ~ AppService ~ json:', json);
    } catch (error) {
      return new InternalServerErrorException('Error fetching weather data');
    }
  }
}
