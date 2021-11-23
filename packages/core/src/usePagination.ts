import React from 'react';
import { getPageItemFactory } from './page';
import { getPagination } from './pagination';
import { Page, Pagination, UsePaginationProps, UsePaginationType } from './types';

type UpdateParams = {
  page?: number | string;
  totalItems?: number | string;
  itemsPerPage?: number | string;
  maxPageItems?: number | string;
};

type Action = { type: 'previous' } | { type: 'next' } | ({ type: 'update' } & UpdateParams);

const paginationReducer = (state: Pagination, action: Action): Pagination => {
  let { page, totalItems, itemsPerPage, maxPageItems } = state;
  switch (action.type) {
    case 'previous':
      if (state.page) {
        page = state.page - 1;
      }
      break;

    case 'next':
      if (state.page) {
        page = state.page + 1;
      }
      break;

    case 'update':
      if (action.page) {
        page = Number(action.page);
      }
      if (action.totalItems) {
        totalItems = Number(action.totalItems);
      }
      if (action.itemsPerPage) {
        itemsPerPage = Number(action.itemsPerPage);
      }
      if (action.maxPageItems) {
        maxPageItems = Number(action.maxPageItems);
      }
      break;
  }
  return page === state.page &&
    totalItems === state.totalItems &&
    itemsPerPage === state.itemsPerPage &&
    maxPageItems === state.maxPageItems
    ? state
    : getPagination({ ...state, page, totalItems, itemsPerPage, maxPageItems });
};

const PREVIOUS_ACTION: Action = { type: 'previous' };
const NEXT_ACTION: Action = { type: 'next' };

export const usePagination = ({
  page,
  arrows,
  numbers,
  totalItems,
  itemsPerPage,
  maxPageItems,
  size,
  toItem,
  fromItem,
  totalPages,
  getPageItemProps,
}: UsePaginationProps): UsePaginationType => {
  const initialData = {
    page,
    arrows,
    numbers,
    totalItems,
    itemsPerPage,
    maxPageItems,
    size,
    toItem,
    fromItem,
    totalPages,
  };
  const [pagination, dispatch] = React.useReducer(paginationReducer, initialData, getPagination);
  const firstRender = React.useRef(true);
  const UPDATE_ACTION = (params: UpdateParams) => dispatch({ type: 'update', ...params });
  const setTotalItems = (totalItems: number) => UPDATE_ACTION({ totalItems });
  const setItemsPerPage = (itemsPerPage: number) => UPDATE_ACTION({ itemsPerPage });
  const setMaxPageItems = (maxPageItems: number) => UPDATE_ACTION({ maxPageItems });
  const previous = () => dispatch(PREVIOUS_ACTION);
  const next = () => dispatch(NEXT_ACTION);
  const goTo = (page: Page) => {
    switch (page) {
      case 'previous':
        previous();
        break;

      case 'next':
        next();
        break;

      default:
        UPDATE_ACTION({ page });
        break;
    }
  };

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      UPDATE_ACTION(initialData);
    }
  }, [page, totalItems, itemsPerPage, maxPageItems]);

  const getPageItem = React.useMemo(
    () => getPageItemFactory(pagination, goTo, getPageItemProps),
    [
      pagination.page,
      pagination.totalPages,
      pagination.size,
      pagination.maxPageItems,
      pagination.arrows,
      pagination.numbers,
      goTo,
      getPageItemProps,
    ]
  );

  return {
    ...pagination,
    currentPage: pagination.page,
    goTo,
    previous,
    next,
    getPageItem,
    setTotalItems,
    setItemsPerPage,
    setMaxPageItems,
  };
};
