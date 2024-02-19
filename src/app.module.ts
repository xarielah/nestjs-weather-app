import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoService } from './geo/geo.service';
import apiConfig from './config/api.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GeoService],
})
export class AppModule {}
