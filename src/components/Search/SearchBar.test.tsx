import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import { BrowserRouter } from 'react-router-dom';
import { DataSearchProvider } from '@/context/dataSearchContext/dataSearchContext';

describe('Search bar', () => {
  test('check that the component retrieves the value from the local storage upon mounting.', () => {
    const mockFn = vi.fn();
    localStorage.setItem('searchValue', 'testValue');
    render(
      <DataSearchProvider>
        <SearchBar onSearch={mockFn} setPage={mockFn} />
      </DataSearchProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const searchBar = screen.getByPlaceholderText('Search');
    expect(searchBar).toHaveValue('testValue');
  });

  test('verify that clicking the Search button saves the entered value to the local storage.', async () => {
    const mockFn = vi.fn();
    localStorage.setItem('searchValue', 'testValue');
    render(
      <DataSearchProvider>
        <SearchBar onSearch={mockFn} setPage={mockFn} />
      </DataSearchProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const searchBar = screen.getByPlaceholderText('Search');

    fireEvent.change(searchBar, { target: { value: 'Rick' } });
    const storageValue = localStorage.getItem('searchValue');

    expect(storageValue).toBe('Rick');
  });
});
