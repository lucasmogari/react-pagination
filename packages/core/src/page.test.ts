import { getPageItemFactory } from './page';
import { getPagination } from './pagination';
import { GetPageItemPropsFunction, Page, Pagination } from './types';

test('getPageItemProps', () => {
  const pagination = getPagination({ totalItems: 50 });
  const getPageItemProps: GetPageItemPropsFunction = (pageItemIndex, page, props) => ({
    ...props,
    label: page,
    onClick: 'override onClick',
  });

  const getPageItem = getPageItemFactory(pagination, undefined, getPageItemProps);
  expect(getPageItem(1).props.label).toBe(1);
  expect(getPageItem(1).props.onClick).toBe('override onClick');
});

test('arrows only', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, numbers: false });

  pagination.page = 1;
  expectPages(pagination, [
    { page: 'previous', disabled: true },
    { page: 'next', disabled: false },
  ]);

  pagination.page = 2;
  expectPages(pagination, [
    { page: 'previous', disabled: false },
    { page: 'next', disabled: false },
  ]);

  pagination.page = 10;
  expectPages(pagination, [
    { page: 'previous', disabled: false },
    { page: 'next', disabled: true },
  ]);
});

test('numbers only', () => {
  const pagination = getPagination({
    totalItems: 20,
    itemsPerPage: 5,
    maxPageItems: 4,
    arrows: false,
  });
  expectPages(pagination, [{ page: 1, current: true }, 2, 3, 4]);

  pagination.page = 2;
  expectPages(pagination, [1, 2, 3, 4]);

  pagination.page = 4;
  expectPages(pagination, [1, 2, 3, { page: 4, current: true }]);
});

test('infinity page items', () => {
  const pagination = getPagination({ totalItems: 500, itemsPerPage: 5, maxPageItems: Infinity });
  const getPageItemProps = getPageItemFactory(pagination);
  expect(getPageItemProps(0).page).toBe('previous');
  expect(getPageItemProps(1).page).toBe(1);
  expect(getPageItemProps(100).page).toBe(100);
  expect(getPageItemProps(101).page).toBe('next');
});

test('10 pages with 1 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 1 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 2, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', { page: 10, current: true }, 'next']);
});

test('10 pages with 2 page items', () => {
  let pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 2 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 2, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, 2, 'next']);

  pagination.page = 9;
  expectPages(pagination, ['previous', 8, { page: 9, current: true }, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', 9, { page: 10, current: true }, 'next']);
});

test('10 pages with 3 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 3 });
  expectPages(pagination, ['previous', 1, 2, 3, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, 2, 3, 'next']);

  pagination.page = 7;
  expectPages(pagination, ['previous', 6, 7, 8, 'next']);

  pagination.page = 8;
  expectPages(pagination, ['previous', 7, 8, 9, 'next']);

  pagination.page = 9;
  expectPages(pagination, ['previous', 8, 9, 10, 'next']);
});

test('10 pages with 4 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 4 });
  expectPages(pagination, ['previous', 1, 2, 3, 4, 'next']);

  pagination.page = 6;
  expectPages(pagination, ['previous', 5, 6, 7, 8, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', 7, 8, 9, 10, 'next']);
});

test('10 pages with 5 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 5 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 2, 3, 'gap', 10, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, 2, 3, 'gap', 10, 'next']);

  pagination.page = 3;
  expectPages(pagination, ['previous', 1, 'gap', { page: 3, current: true }, 'gap', 10, 'next']);

  pagination.page = 4;
  expectPages(pagination, ['previous', 1, 'gap', { page: 4, current: true }, 'gap', 10, 'next']);

  pagination.page = 6;
  expectPages(pagination, ['previous', 1, 'gap', { page: 6, current: true }, 'gap', 10, 'next']);

  pagination.page = 8;
  expectPages(pagination, ['previous', 1, 'gap', { page: 8, current: true }, 'gap', 10, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', 1, 'gap', 8, 9, { page: 10, current: true }, 'next']);
});

test('10 pages with 6 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 6 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 2, 3, 4, 'gap', 10, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, { page: 2, current: true }, 3, 4, 'gap', 10, 'next']);

  pagination.page = 3;
  expectPages(pagination, ['previous', 1, 2, { page: 3, current: true }, 4, 'gap', 10, 'next']);

  pagination.page = 4;
  expectPages(pagination, ['previous', 1, 'gap', { page: 4, current: true }, 5, 'gap', 10, 'next']);

  pagination.page = 5;
  expectPages(pagination, ['previous', 1, 'gap', { page: 5, current: true }, 6, 'gap', 10, 'next']);

  pagination.page = 6;
  expectPages(pagination, ['previous', 1, 'gap', { page: 6, current: true }, 7, 'gap', 10, 'next']);

  pagination.page = 7;
  expectPages(pagination, ['previous', 1, 'gap', { page: 7, current: true }, 8, 'gap', 10, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', 1, 'gap', 7, 8, 9, { page: 10, current: true }, 'next']);
});

test('10 pages with 7 page items', () => {
  const pagination = getPagination({ totalItems: 50, itemsPerPage: 5, maxPageItems: 7 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 2, 3, 4, 5, 'gap', 10, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, { page: 2, current: true }, 3, 4, 5, 'gap', 10, 'next']);

  pagination.page = 3;
  expectPages(pagination, ['previous', 1, 2, { page: 3, current: true }, 4, 5, 'gap', 10, 'next']);

  pagination.page = 4;
  expectPages(pagination, ['previous', 1, 2, 3, { page: 4, current: true }, 5, 'gap', 10, 'next']);

  pagination.page = 5;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    4,
    { page: 5, current: true },
    6,
    'gap',
    10,
    'next',
  ]);

  pagination.page = 6;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    5,
    { page: 6, current: true },
    7,
    'gap',
    10,
    'next',
  ]);

  pagination.page = 7;
  expectPages(pagination, ['previous', 1, 'gap', 6, { page: 7, current: true }, 8, 9, 10, 'next']);

  pagination.page = 10;
  expectPages(pagination, ['previous', 1, 'gap', 6, 7, 8, 9, { page: 10, current: true }, 'next']);
});

test('15 pages with 7 page items', () => {
  const pagination = getPagination({ totalItems: 75, itemsPerPage: 5, maxPageItems: 7 });
  expectPages(pagination, ['previous', { page: 1, current: true }, 2, 3, 4, 5, 'gap', 15, 'next']);

  pagination.page = 2;
  expectPages(pagination, ['previous', 1, { page: 2, current: true }, 3, 4, 5, 'gap', 15, 'next']);

  pagination.page = 3;
  expectPages(pagination, ['previous', 1, 2, { page: 3, current: true }, 4, 5, 'gap', 15, 'next']);

  pagination.page = 4;
  expectPages(pagination, ['previous', 1, 2, 3, { page: 4, current: true }, 5, 'gap', 15, 'next']);

  pagination.page = 5;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    4,
    { page: 5, current: true },
    6,
    'gap',
    15,
    'next',
  ]);

  pagination.page = 6;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    5,
    { page: 6, current: true },
    7,
    'gap',
    15,
    'next',
  ]);

  pagination.page = 7;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    6,
    { page: 7, current: true },
    8,
    'gap',
    15,
    'next',
  ]);

  pagination.page = 10;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    9,
    { page: 10, current: true },
    11,
    'gap',
    15,
    'next',
  ]);

  pagination.page = 11;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    10,
    { page: 11, current: true },
    12,
    'gap',
    15,
    'next',
  ]);

  pagination.page = 15;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    11,
    12,
    13,
    14,
    { page: 15, current: true },
    'next',
  ]);
});

test('100 pages with 9 page items', () => {
  const pagination = getPagination({ totalItems: 500, itemsPerPage: 5, maxPageItems: 9 });
  expectPages(pagination, [
    'previous',
    { page: 1, current: true },
    2,
    3,
    4,
    5,
    6,
    7,
    'gap',
    100,
    'next',
  ]);

  pagination.page = 15;
  expectPages(pagination, [
    'previous',
    1,
    'gap',
    13,
    14,
    { page: 15, current: true },
    16,
    17,
    'gap',
    100,
    'next',
  ]);
});

type PageItem = {
  current?: boolean;
  disabled?: boolean;
  page?: Page;
};

const expectPages = (pagination: Pagination, pages: Array<Page | PageItem>) => {
  const getPageItem = getPageItemFactory(pagination);
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (typeof page === 'object') {
      const pageItem = getPageItem(i);
      for (const key in <PageItem>page) {
        expect(pageItem[key as keyof PageItem]).toBe(page[key as keyof PageItem]);
      }
    } else {
      expect(getPageItem(i).page).toBe(page);
    }
  }
};
