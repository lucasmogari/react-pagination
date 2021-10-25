import { getPagination } from './pagination';

test('total pages', () => {
  expect(getPagination({ totalItems: 10, itemsPerPage: 5 }).totalPages).toBe(2);
  expect(getPagination({ totalItems: 6, itemsPerPage: 5 }).totalPages).toBe(2);
  expect(getPagination({ totalItems: 5, itemsPerPage: 5 }).totalPages).toBe(1);
  expect(getPagination({ totalItems: 1, itemsPerPage: 5 }).totalPages).toBe(1);
  expect(getPagination({ totalItems: 0, itemsPerPage: 5 }).totalPages).toBe(0);
});

test('from item', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).fromItem).toBe(1);
  expect(getPagination({ page: 2, totalItems: 10, itemsPerPage: 5 }).fromItem).toBe(6);
});

test('to item', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).toItem).toBe(5);
  expect(getPagination({ page: 2, totalItems: 7, itemsPerPage: 5 }).toItem).toBe(7);
});

test('infinity page items', () => {
  const pagination = getPagination({
    totalItems: 50000,
    itemsPerPage: 5,
    maxPageItems: Infinity,
    arrows: false,
  });
  expect(pagination.size).toBe(10000);
});

test('invalid total items', () => {
  const pagination = getPagination({ totalItems: NaN });
  expect(pagination.size).toBe(2);
});
