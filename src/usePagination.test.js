import { renderHook, act } from '@testing-library/react-hooks';
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

  const pageItemProps0 = result.current.getPageItemProps(0);
  expect(pageItemProps0.page).toBe('previous');
  expect(pageItemProps0.disabled).toBe(true);

  const pageItemProps1 = result.current.getPageItemProps(1);
  expect(pageItemProps1.page).toBe('next');
  expect(pageItemProps1.disabled).toBe(false);

  act(() => result.current.next());
  expect(result.current.getPageItemProps(1).disabled).toBe(true);
});
