import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiController } from './pokeapi.controller';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('PokeapiController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  describe('GET /pokemon', () => {
    it('should return 200 status code', async () => {
      return request(app.getHttpServer())
        .get('/api/pokemon')
        .expect(200);
    });
  });

  describe('GET /pokemon/id', () => {
    it('should return 200 status code', async () => {
      return request(app.getHttpServer())
        .get('/api/pokemon/1')
        .expect(200);
    });

    it('should return 404 status code when the id not found', async () => {
      return request(app.getHttpServer())
        .get('/api/pokemon/-1')
        .expect(404);
    });
  });

  describe('GET /pokemonAndTypes/id', () => {
    it('should return 200 status code', async () => {
      return request(app.getHttpServer())
        .get('/api/pokemonAndTypes/1')
        .expect(200);
    });

    it('should return 404 status code when the id not found', async () => {
      return request(app.getHttpServer())
        .get('/api/pokemonAndTypes/-1')
        .expect(404);
    });
  });
});
