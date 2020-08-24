import React from 'react';
import { getPagination } from './pagination';
import { getPageItemFactory } from './page';

const paginationReducer = (state, action) => {
  let { page, totalItems, itemsPerPage, maxPageItems } = state;
  switch (action.type) {
    case 'update':
      page = parseInt(action.page, 10);
      break;

    case 'previous':
      page = state.page - 1;
      break;

    case 'next':
      page = state.page + 1;
      break;

    case 'update-total-items':
      totalItems = parseInt(action.totalItems, 10);
      break;

    case 'update-items-per-page':
      itemsPerPage = parseInt(action.itemsPerPage, 10);
      break;

    case 'update-max-page-items':
      maxPageItems = parseInt(action.maxPageItems, 10);
      break;

    default:
      throw new Error(`Unknown action type ${action.type}`);
  }

  return page === state.page &&
    totalItems === state.totalItems &&
    itemsPerPage === state.itemsPerPage &&
    maxPageItems === state.maxPageItems
    ? state
    : getPagination({ ...state, page, totalItems, itemsPerPage, maxPageItems });
};

const PREVIOUS_ACTION = { type: 'previous' };
const NEXT_ACTION = { type: 'next' };

export const usePagination = (initialData) => {
  const [pagination, dispatch] = React.useReducer(paginationReducer, initialData, getPagination);

  const setTotalItems = (totalItems) => dispatch({ type: 'update-total-items', totalItems });
  const setItemsPerPage = (itemsPerPage) =>
    dispatch({ type: 'update-items-per-page', itemsPerPage });
  const setMaxPageItems = (maxPageItems) =>
    dispatch({ type: 'update-max-page-items', maxPageItems });
  const previous = () => dispatch(PREVIOUS_ACTION);
  const next = () => dispatch(NEXT_ACTION);
  const goTo = (page) => {
    switch (page) {
      case 'previous':
        previous();
        break;

      case 'next':
        next();
        break;

      default:
        dispatch({ type: 'update', page });
        break;
    }
  };

  React.useEffect(() => void setTotalItems(initialData.totalItems), [initialData.totalItems]);

  const getPageItem = React.useCallback(getPageItemFactory(pagination, goTo), [
    pagination.page,
    pagination.totalPages,
    pagination.size,
    pagination.maxPageItems,
    pagination.arrows,
    pagination.numbers,
    pagination.getPageItemProps,
  ]);

  return {
    ...pagination,
    goTo,
    previous,
    next,
    getPageItem,
    setTotalItems,
    setItemsPerPage,
    setMaxPageItems,
  };
};
