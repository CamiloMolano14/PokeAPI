export class PokemonTypeDto {
  slot: number;
  type: NameUrlDto;
}

export class PokemonTypeExtendDto {
  slot: number;
  type: PokemonWithLocalizedTypesDto;
}

export class PokemonWithTypesDto {
  name: string;
  types: PokemonTypeDto[];
}

export class PokemonWithTypesExtendedDto {
  name: string;
  types: PokemonTypeExtendDto[];
}

export class NameUrlDto {
  name: string;
  url: string;
}

export class LanguageDto {
  name: string;
  language: NameUrlDto;
}

export class PokemonWithLocalizedTypesDto extends NameUrlDto {
  names: LanguageDto[];
}

export class PokemonListDto {
  results: NameUrlDto[];
}