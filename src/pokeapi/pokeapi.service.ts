import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  PokemonListDto,
} from './dto/pokemon.dto';

@Injectable()
export class PokeapiService {

  apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('POKE_API_URL');
  }

  async findAll(): Promise<PokemonListDto> {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/pokemon/?limit=100`));
      return { results: response.data.results };
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching the Pokémon data');
    }
  }

  async findOne(id: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/pokemon/${id}`),
      );
      const { name, types } = response.data;
      return { name, types };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Pokemon with ID ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching the Pokémon data');
    }
  }

  async findOneWithTypes(id: number) {
    let { name, types } = await this.findOne(id);

    await Promise.all(
      types.map(async (type) => {
        type.type.names = await this.getTypesSpanishAndJapanese(type.type.url);
      }),
    );
    return { name, types };
  }

  async getTypesSpanishAndJapanese(url: string) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(url));

      return data.names.filter(
        (name) => name.language.name === 'es' || name.language.name === 'ja',
      );
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching the Pokémon types data');
    }
  }
}
