import { Controller, Get, Param } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PokemonListDto,
  PokemonWithTypesDto,
  PokemonWithTypesExtendedDto,
} from './dto/pokemon.dto';

@ApiTags('Pokeapi')
@Controller('api')
export class PokeapiController {
  constructor(private readonly pokeapiService: PokeapiService) {
  }

  @Get('pokemon')
  @ApiOkResponse({ description: 'Get all pokemons', type: PokemonListDto })
  @ApiInternalServerErrorResponse({ description: 'An error occurred while fetching the Pokémon data' })
  findAll() {
    return this.pokeapiService.findAll();
  }

  @Get('pokemon/:id')
  @ApiOkResponse({ description: 'Get all pokemons', type: PokemonWithTypesDto })
  findOne(@Param('id') id: string) {
    return this.pokeapiService.findOne(+id);
  }

  @Get('pokemonAndTypes/:id')
  @ApiOkResponse({
    description: 'Get a specific pokemon with types in spanish and japanese translate',
    type: PokemonWithTypesExtendedDto,
  })
  findOneWithTypes(@Param('id') id: string) {
    return this.pokeapiService.findOneWithTypes(+id);
  }
}
