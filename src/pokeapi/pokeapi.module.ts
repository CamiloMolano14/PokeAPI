import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';
import { PokeapiController } from './pokeapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PokeapiController],
  providers: [PokeapiService],
})
export class PokeapiModule {
}
