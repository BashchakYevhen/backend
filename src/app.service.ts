import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly baseUrl = this.configService.get<string>('BASE_URL');
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World !';
  }
  async getAllRecipes(search = '') {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any[]>(
          `${this.baseUrl}/search.php?s=${search.trim()}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error: any) {
      this.logger.error(error);
      throw 'An error happened!';
    }
  }
  async getFilteredRecipes(
    ingredients: string,
    country: string,
    category: string,
  ) {
    try {
      let url = `${this.baseUrl}/filter.php?`;
      if (ingredients) {
        url += `i=${ingredients.trim()}`;
      }
      if (country) {
        url += `a=${country.trim()}`;
      }
      if (category) {
        url += `c=${category.trim()}`;
      }
      const { data } = await firstValueFrom(this.httpService.get<any[]>(url));
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw 'An error happened!';
    }
  }
  async getRecipeById(id: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<any[]>(`${this.baseUrl}/lookup.php?i=${id}`),
      );
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw 'An error happened!';
    }
  }
}
