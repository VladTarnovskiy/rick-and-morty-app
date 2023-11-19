import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination', () => {
  test('Check pagination render', async () => {
    const mockFn = vi.fn();
    render(<Pagination page={1} pages={2} setPage={mockFn} />, {
      wrapper: BrowserRouter,
    });

    const leftButton = screen.getByAltText('Turn left');

    expect(leftButton).toBeInTheDocument();
  });
  test('check counter data', async () => {
    const mockFn = vi.fn();
    render(<Pagination page={1} pages={2} setPage={mockFn} />, {
      wrapper: BrowserRouter,
    });

    const rightButton = screen.getByAltText('Turn right');

    fireEvent.click(rightButton);
    const pageCounter = screen.getByTestId('page-counter');

    expect(pageCounter).toHaveTextContent('1');
  });
});
