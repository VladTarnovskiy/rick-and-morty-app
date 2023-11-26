import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import mockRouter from 'next-router-mock';

describe('Pagination', () => {
  mockRouter.push('/?page=2');

  test('Check pagination render', async () => {
    render(<Pagination amountPages={500} />);

    const leftButton = screen.getByAltText('Turn left');
    expect(leftButton).toBeInTheDocument();
  });
  test('check counter data increase', async () => {
    await render(<Pagination amountPages={500} />);

    const rightButton = screen.getByAltText('Turn right');
    fireEvent.click(rightButton);
    const pageCounter = screen.getByTestId('page-counter');
    expect(pageCounter).toHaveTextContent('2');
  });
});
