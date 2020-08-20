export const getPageItemPropsFactory = (pagination) => {
  const size = pagination.size - 1;
  let maxPageItems = pagination.maxPageItems;
  let boundaryCount, lowerBoundary, upperBoundary, upperStart, middleStart;
  if (pagination.numbers) {
    if (pagination.arrows) {
      maxPageItems < 1 && (maxPageItems = 1);
    } else {
      maxPageItems < 5 && maxPageItems > pagination.totalPages && (maxPageItems = 5);
    }

    boundaryCount = maxPageItems - 2;
    lowerBoundary = boundaryCount + 1;
    upperBoundary = pagination.totalPages - boundaryCount;
    upperStart = pagination.totalPages - maxPageItems;
    middleStart = pagination.page - Math.ceil((maxPageItems - 4) / 2) - 2;
  }

  return (pageItemIndex) => {
    const pageProps = {};
    if (pageItemIndex > size) {
      return pageProps;
    }

    if (pagination.arrows) {
      if (pageItemIndex === 0) {
        pageProps.page = 'previous';
        pageProps.disabled = pagination.page === 1;
      } else if (pageItemIndex === size) {
        pageProps.page = 'next';
        pageProps.disabled = pagination.page === pagination.totalPages;
      }
    }

    if (pagination.numbers && !pageProps.page) {
      !pagination.arrows && pageItemIndex++;

      if (maxPageItems === 1) {
        pageProps.page = pagination.page;
      } else if (pagination.totalPages <= maxPageItems) {
        pageProps.page = pageItemIndex;
      } else if (maxPageItems < 5) {
        if (pagination.page + maxPageItems - 1 > pagination.totalPages) {
          pageProps.page = upperStart + pageItemIndex;
        } else {
          pageProps.page = pagination.page + pageItemIndex - 1;
        }
      } else {
        if (pageItemIndex === 1) {
          pageProps.page = 1;
        } else if (pageItemIndex === maxPageItems) {
          pageProps.page = pagination.totalPages;
        } else {
          if (pagination.page < lowerBoundary) {
            pageProps.page = pageItemIndex < lowerBoundary ? pageItemIndex : 'gap';
          } else if (pagination.page > upperBoundary) {
            pageProps.page = pageItemIndex > 2 ? upperStart + pageItemIndex : 'gap';
          } else {
            pageProps.page =
              pageItemIndex === 2 || pageItemIndex === maxPageItems - 1
                ? 'gap'
                : pageItemIndex + middleStart;
          }
        }
      }
      pageProps.current = pagination.page === pageProps.page;
    }
    return pageProps;
  };
};
