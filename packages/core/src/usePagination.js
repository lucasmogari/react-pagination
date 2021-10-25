import React from 'react';
import { getPagination } from './pagination';
import { getPageItemFactory } from './page';

const paginationReducer = (state, { type, ...params }) => {
  let { page, totalItems, itemsPerPage, maxPageItems } = state;
  switch (type) {
    case 'previous':
      page = state.page - 1;
      break;

    case 'next':
      page = state.page + 1;
      break;

    case 'update':
      if (params.page) {
        page = Number(params.page);
      }
      if (params.totalItems) {
        totalItems = Number(params.totalItems);
      }
      if (params.itemsPerPage) {
        itemsPerPage = Number(params.itemsPerPage);
      }
      if (params.maxPageItems) {
        maxPageItems = Number(params.maxPageItems);
      }
      break;

    default:
      throw new Error(`Unknown action type ${type}`);
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
  const firstRender = React.useRef(true);
  const UPDATE_ACTION = (params) => dispatch({ type: 'update', ...params });
  const setTotalItems = (totalItems) => UPDATE_ACTION({ totalItems });
  const setItemsPerPage = (itemsPerPage) => UPDATE_ACTION({ itemsPerPage });
  const setMaxPageItems = (maxPageItems) => UPDATE_ACTION({ maxPageItems });
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
  }, [
    initialData.page,
    initialData.totalItems,
    initialData.itemsPerPage,
    initialData.maxPageItems,
  ]);

  const getPageItem = React.useMemo(() => getPageItemFactory(pagination, goTo, getPageItemProps), [
    pagination.page,
    pagination.totalPages,
    pagination.size,
    pagination.maxPageItems,
    pagination.arrows,
    pagination.numbers,
    getPageItemProps,
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
