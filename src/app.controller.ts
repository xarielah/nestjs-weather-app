import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/weather')
  async getWeather(
    @Query('lon') lon: string | number,
    @Query('lat') lat: string | number,
  ): Promise<any> {
    if (!lon || !lat)
      return new BadRequestException("Missing 'lon' or 'lat' query parameter");

    if (isNaN(Number(lon)) || isNaN(Number(lat)))
      return new BadRequestException("Invalid 'lon' or 'lat' query parameter");

    return await this.appService.getWeather({ lon, lat });
  }
}
