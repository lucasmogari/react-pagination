import React from 'react';
import { getPagination } from './pagination';
import { getPageItemFactory } from './page';

const paginationReducer = (state, action) => {
  let { page, totalItems, itemsPerPage, maxPageItems } = state;
  switch (action.type) {
    case 'update':
      page = Number(action.page);
      break;

    case 'previous':
      page = state.page - 1;
      break;

    case 'next':
      page = state.page + 1;
      break;

    case 'totalItems':
      totalItems = Number(action.totalItems);
      break;

    case 'itemsPerPage':
      itemsPerPage = Number(action.itemsPerPage);
      break;

    case 'maxPageItems':
      maxPageItems = Number(action.maxPageItems);
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

export const usePagination = ({ getPageItemProps, ...initialData }) => {
  const [pagination, dispatch] = React.useReducer(paginationReducer, initialData, getPagination);

  const setTotalItems = (totalItems) => dispatch({ type: 'totalItems', totalItems });
  const setItemsPerPage = (itemsPerPage) => dispatch({ type: 'itemsPerPage', itemsPerPage });
  const setMaxPageItems = (maxPageItems) => dispatch({ type: 'maxPageItems', maxPageItems });
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

  React.useEffect(() => {
    if (!initialData?.page){
      return;
    }

    dispatch({ page: initialData?.page, type: 'update' })
  }, [initialData?.page])

  const getPageItem = React.useMemo(() => getPageItemFactory(pagination, goTo, getPageItemProps), [
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
    getPageItem,
    setTotalItems,
    setItemsPerPage,
    setMaxPageItems,
  };
};
