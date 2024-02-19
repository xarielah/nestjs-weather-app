import { Controller, Get, Head, Headers, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { GeoService } from './geo/geo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly geoService: GeoService,
  ) {}

  @Get()
  async getWeather(
    @Ip() ip: string,
    @Headers('x-real-ip') realIp: any,
    @Headers('x-forwarded-for') forwardedFor: any,
    @Headers() headers: any,
  ): Promise<any> {
    console.log('🚀 ~ AppController ~ headers:', headers);
    console.log('🚀 ~ AppController ~ forwardedFor:', forwardedFor);
    console.log('🚀 ~ AppController ~ getWeather ~ headers:', realIp);
    console.log('User IP: ' + ip);
    const geolocation = await this.geoService.getGeolocation(
      realIp || '87.68.141.5',
    );
    console.log('Geolocation: ' + JSON.stringify(geolocation));
    return await this.appService.getWeather(geolocation);
  }
}
