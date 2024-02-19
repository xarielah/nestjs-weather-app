import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GeoService {
  private readonly apiUrl = 'http://ip-api.com/json/';
  async getGeolocation(ip: string): Promise<any> {
    if (this.isValidIP(ip)) {
      const response = await fetch(`${this.apiUrl}${ip}`);
      return response.json();
    } else {
      return new BadRequestException('Invalid IP address');
    }
  }

  private isValidIP(ip: string): boolean {
    return /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
      ip,
    );
  }
}
