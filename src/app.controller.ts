import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { GeoService } from './geo/geo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly geoService: GeoService,
  ) {}

  @Get()
  async getWeather(@Ip() ip: string): Promise<any> {
    console.log('User IP: ' + ip);
    const geolocation = await this.geoService.getGeolocation(ip);
    console.log('Geolocation: ' + JSON.stringify(geolocation));
    return await this.appService.getWeather(geolocation);
  }
}
