import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from './pokeapi.service';
import { AppModule } from '../app.module';

describe('PokeapiService', () => {
  let service: PokeapiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PokeapiService>(PokeapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 100 items', async () => {
    const pokemon = await service.findAll();
    expect(pokemon.results).toHaveLength(100);
    expect(pokemon.results[0]).toHaveProperty('name');
    expect(pokemon.results[0]).toHaveProperty('url');
  });

  it('should return a pokemon by id', async () => {
    const pokemon = await service.findOne(1);
    expect(pokemon.name).toBe('bulbasaur');
    expect(pokemon).toHaveProperty('types');
  });

  it('should return a pokemon with types by id', async () => {
    const pokemon = await service.findOneWithTypes(1);
    expect(pokemon.name).toBe('bulbasaur');
    expect(pokemon).toHaveProperty('types');
    expect(pokemon.types[0]).toHaveProperty('type');
    expect(pokemon.types[0].type).toHaveProperty('names');
    expect(pokemon.types[0].type.names).toHaveLength(2);
    expect(pokemon.types[0].type.names[0]).toHaveProperty('language');
    expect(pokemon.types[0].type.names[0]).toHaveProperty('name');
    expect(pokemon.types[0].type.names[0].language.name).toBe('es');
    expect(pokemon.types[0].type.names[1].language.name).toBe('ja');
  });
});
