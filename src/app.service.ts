import {
  BadGatewayException,
  BadRequestException,
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

      const uri = this.configService.get('apiUrl');
      console.log('🚀 ~ AppService ~ uri:', uri);

      const data = await fetch(uri + searchParams.toString());
      const json = (await data.json()) as { cod: number };
      if (json.cod === 200) {
        return json;
      } else {
        return new BadRequestException('Could not fetch weather data');
      }
    } catch (error) {
      return new InternalServerErrorException('Error fetching weather data');
    }
  }
}
