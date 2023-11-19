import { MainPage } from './MainPage';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DataSearchProvider } from '@/context/dataSearchContext/dataSearchContext';

describe('Main page', () => {
  test('verify that the component renders the specified number of cards', async () => {
    render(
      <DataSearchProvider>
        <MainPage />
      </DataSearchProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const mainPage = screen.getByTestId('main-page-element');
    expect(mainPage).toBeInTheDocument();
  });
});
