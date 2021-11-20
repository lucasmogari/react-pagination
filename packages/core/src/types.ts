// Definitions by: Laura Beatris <https://github.com/LauraBeatris>

import React from 'react';

export type Page = 'previous' | 'next' | 'gap' | number;

export type PageItemProps = {
  disabled?: boolean;
  label?: string;
  'aria-current'?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type PageItem = {
  current?: boolean;
  disabled?: boolean;
  props: PageItemProps;
  page?: Page;
};

export type GoToPageFunction = (page: Page) => void;

export type PreviousPageFunction = () => void;

export type NextPageFunction = () => void;

export type GetPageItemFunction = (page: Page) => PageItem;

export type SetTotalItemsFunction = (totalItem: number) => void;

export type SetMaxPageItemsFunction = (maxPageItems: number) => void;

export type SetItemsPerPageFunction = (itemsPerPage: number) => void;

export type PaginationInput = {
  page?: number;
  arrows?: boolean;
  numbers?: boolean;
  totalItems: number;
  itemsPerPage?: number;
  maxPageItems?: number;
};

export type Pagination = PaginationInput & {
  size?: number;
  toItem?: number;
  fromItem?: number;
  totalPages?: number;
};

export type GetPageItemPropsFunction = (pageItemIndex: number, page: Page, props: {}) => {};

export type UsePaginationProps = Pagination & {
  getPageItemProps?: GetPageItemPropsFunction;
};

export type UsePaginationType = Pagination & {
  goTo: GoToPageFunction;
  next: NextPageFunction;
  previous: PreviousPageFunction;
  getPageItem: GetPageItemFunction;
  setTotalItems: SetTotalItemsFunction;
  setItemsPerPage: SetItemsPerPageFunction;
  setMaxPageItems: SetMaxPageItemsFunction;
};
