import { http, HttpResponse } from 'msw';
import { dataMock } from './dataMock';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json({
      data: [dataMock, dataMock],
    });
  }),
  http.get('https://rickandmortyapi.com/api/character/*', () => {
    return HttpResponse.json({
      data: dataMock,
    });
  }),
];
