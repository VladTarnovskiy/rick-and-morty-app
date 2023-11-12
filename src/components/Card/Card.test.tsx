import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { DataSearchProvider } from '@/context/dataSearchContext/dataSearchContext';
import { Card } from './Card';
const mockData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('Card', () => {
  test('ensure that the card component renders the relevant card data', async () => {
    render(
      <DataSearchProvider>
        <Card character={mockData} />
      </DataSearchProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const name = screen.getByText(/Rick Sanchez/i);
    const status = screen.getByText(/Human/i);
    const species = screen.getByText(/Alive/i);
    const location = screen.getByText(/Earth/i);

    expect(name).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  //   test('validate that clicking on a card opens a detailed card component', async () => {
  //     render(
  //       <DataSearchProvider>
  //         <Card character={mockData} />
  //       </DataSearchProvider>,
  //       {
  //         wrapper: BrowserRouter,
  //       }
  //     );

  //     const card = screen.getByTestId('card-element');
  //     fireEvent.click(card);
  //     const detailsCard = screen.getByTestId('cardDetail-element');
  //     expect(detailsCard).toBeInTheDocument();
  //   });
});
