import { act, renderHook } from '@testing-library/react-hooks';
import { expect, test } from 'vitest';
import { usePagination } from './usePagination';

test('go to a page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  expect(result.current.totalPages).toBe(2);
  expect(result.current.page).toBe(1);

  act(() => result.current.goTo(2));
  expect(result.current.page).toBe(2);

  act(() => result.current.goTo(3));
  expect(result.current.page).toBe(2);
});

test('go to next page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  act(() => result.current.next());
  expect(result.current.page).toBe(2);

  act(() => result.current.next());
  expect(result.current.page).toBe(2);
});

test('go to previous page', () => {
  const { result } = renderHook(() => usePagination({ page: 2, totalItems: 10, itemsPerPage: 5 }));

  act(() => result.current.previous());
  expect(result.current.page).toBe(1);

  act(() => result.current.previous());
  expect(result.current.page).toBe(1);
});

test('update items per page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  act(() => result.current.setItemsPerPage(2));
  expect(result.current.totalPages).toBe(5);

  act(() => result.current.setItemsPerPage(3));
  expect(result.current.totalPages).toBe(4);
});

test('only arrows', () => {
  const { result } = renderHook(() =>
    usePagination({ page: 1, totalItems: 10, itemsPerPage: 5, numbers: false })
  );

  const pageItem0 = result.current.getPageItem(0);
  expect(pageItem0.page).toBe('previous');
  expect(pageItem0.disabled).toBe(true);

  const pageItem1 = result.current.getPageItem(1);
  expect(pageItem1.page).toBe('next');
  expect(pageItem1.disabled).toBe(false);

  act(() => result.current.next());
  expect(result.current.getPageItem(1).disabled).toBe(true);
});

test('update totalItems to 0', () => {
  const { result } = renderHook(() => usePagination({ totalItems: 70, itemsPerPage: 10 }));

  expect(result.current.totalPages).toBe(7);

  act(() => result.current.setTotalItems(0));
  expect(result.current.totalPages).toBe(0);
});
