import React from 'react';
import { getPagination } from './pagination';
import { getPageItemPropsFactory } from './page';

const paginationReducer = (state, action) => {
  let { page, itemsPerPage, maxPageItems } = state;
  switch (action.type) {
    case 'update':
      page = action.page;
      break;

    case 'previous':
      page = state.page - 1;
      break;

    case 'next':
      page = state.page + 1;
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
    itemsPerPage === state.itemsPerPage &&
    maxPageItems === state.maxPageItems
    ? state
    : getPagination({ ...state, page, itemsPerPage, maxPageItems });
};

const PREVIOUS_ACTION = { type: 'previous' };
const NEXT_ACTION = { type: 'next' };

export const usePagination = (initialData) => {
  const [pagination, dispatch] = React.useReducer(paginationReducer, initialData, getPagination);

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

  const getPageItemProps = React.useCallback(getPageItemPropsFactory(pagination), [
    pagination.page,
    pagination.totalPages,
    pagination.size,
    pagination.maxPageItems,
    pagination.arrows,
    pagination.numbers,
  ]);

  return {
    ...pagination,
    goTo,
    previous,
    next,
    getPageItemProps,
    setItemsPerPage: (itemsPerPage) => dispatch({ type: 'update-items-per-page', itemsPerPage }),
    setMaxPageItems: (maxPageItems) => dispatch({ type: 'update-max-page-items', maxPageItems }),
  };
};
