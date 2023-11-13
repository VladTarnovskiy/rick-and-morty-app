import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Details } from './Details';
import { dataMock } from '@/test/mocks/dataMock';

describe('Details', () => {
  const routes = [
    {
      path: `/details/1`,
      element: <Details />,
      loader: () => ({ character: dataMock }),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [`/details/1`],
  });

  test('make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<RouterProvider router={router} />);

    const name = screen.getByText(/Rick Sanchez/i);
    const status = screen.getByText(/Human/i);
    const species = screen.getByText(/Alive/i);
    const location = screen.getByText(/Earth/i);

    expect(name).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });
});
