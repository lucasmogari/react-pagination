import {
  GetPageItemFunction,
  GetPageItemPropsFunction,
  GoToPageFunction,
  Page,
  PageItem,
  Pagination,
} from './types';

export enum PageActionType {
  'previous' = 'previous',
  'next' = 'next',
  'update' = 'update',
}

export const getPageItemFactory = (
  pagination: Pagination,
  goTo?: GoToPageFunction,
  getPageItemProps?: GetPageItemPropsFunction
): GetPageItemFunction => {
  const size = pagination.size - 1;
  let maxPageItems = pagination.maxPageItems;
  let boundaryCount: number,
    lowerBoundary: number,
    upperBoundary: number,
    upperStart: number,
    middleStart: number,
    penultimatePageItem: number;
  if (pagination.numbers) {
    if (pagination.arrows) {
      maxPageItems < 1 && (maxPageItems = 1);
    } else {
      maxPageItems < 5 && maxPageItems > pagination.totalPages && (maxPageItems = 5);
    }

    boundaryCount = maxPageItems - 2;
    lowerBoundary = boundaryCount;
    upperBoundary = pagination.totalPages - boundaryCount + 1;
    upperStart = pagination.totalPages - maxPageItems;
    middleStart = pagination.page - Math.ceil((maxPageItems - 4) / 2) - 2;
    penultimatePageItem = maxPageItems - 1;
  }

  return (page) => {
    const pageItem: PageItem = { props: {} };
    if (typeof page === 'number' && page > size) {
      return pageItem;
    }

    let targetPage: Page = 1;
    if (pagination.arrows) {
      if (page === 0 || page === 'previous') {
        targetPage = pagination.page - 1;
        pageItem.page = 'previous';
        pageItem.disabled = pagination.page <= 1;
      } else if (page === size || page === 'next') {
        targetPage = pagination.page + 1;
        pageItem.page = 'next';
        pageItem.disabled = pagination.page >= pagination.totalPages;
      }
      if (pageItem.disabled) {
        pageItem.props.disabled = true;
      }
    }

    let pageItemIndex = typeof page === 'number' ? page : 0;

    if (pagination.numbers && !pageItem.page) {
      !pagination.arrows && pageItemIndex++;

      if (maxPageItems === 1) {
        pageItem.page = pagination.page;
      } else if (maxPageItems === Infinity || pagination.totalPages <= maxPageItems) {
        pageItem.page = pageItemIndex;
      } else if (maxPageItems < 5) {
        if (pagination.page + penultimatePageItem > pagination.totalPages) {
          pageItem.page = upperStart + pageItemIndex;
        } else {
          pageItem.page = pagination.page + pageItemIndex - (pagination.page > 1 ? 2 : 1);
        }
      } else {
        if (pageItemIndex === 1) {
          pageItem.page = 1;
        } else if (pageItemIndex === maxPageItems) {
          pageItem.page = pagination.totalPages;
        } else {
          if (pagination.page < lowerBoundary) {
            pageItem.page = pageItemIndex <= lowerBoundary ? pageItemIndex : 'gap';
          } else if (pagination.page > upperBoundary) {
            pageItem.page = pageItemIndex > 2 ? upperStart + pageItemIndex : 'gap';
          } else {
            pageItem.page =
              pageItemIndex === 2 || pageItemIndex === penultimatePageItem
                ? 'gap'
                : pageItemIndex + middleStart;
          }
        }
      }
      if (pagination.page === pageItem.page) {
        pageItem.current = true;
        pageItem.props['aria-current'] = 'true';
      }
      targetPage = pageItem.page;
    }

    goTo &&
      (pageItem.props.onClick = (e) => {
        e.preventDefault();
        goTo(targetPage);
      });

    getPageItemProps &&
      typeof getPageItemProps === 'function' &&
      (pageItem.props = Object.assign(
        pageItem.props,
        getPageItemProps(pageItemIndex, targetPage, pageItem.props)
      ));
    return pageItem;
  };
};
