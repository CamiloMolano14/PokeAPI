import { Module } from '@nestjs/common';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PokeapiModule],
})
export class AppModule {
}
