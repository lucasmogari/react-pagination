export const getPageItemFactory = (pagination, goTo, getPageItemProps) => {
  const size = pagination.size - 1;
  let maxPageItems = pagination.maxPageItems;
  let boundaryCount, lowerBoundary, upperBoundary, upperStart, middleStart, penultimatePageItem;
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

  return (pageItemIndex) => {
    const pageItem = { props: {} };
    if (pageItemIndex > size) {
      return pageItem;
    }

    let page
    if (pagination.arrows) {
      if (pageItemIndex === 0 || pageItemIndex === 'previous') {
        page = pagination.page - 1;
        pageItem.page = 'previous';
        pageItem.disabled = pagination.page <= 1;
      } else if (pageItemIndex === size || pageItemIndex === 'next') {
        page = pagination.page + 1;
        pageItem.page = 'next';
        pageItem.disabled = pagination.page >= pagination.totalPages;
      }
      if (pageItem.disabled) {
        pageItem.props.disabled = true;
      }
    }

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
          pageItem.page = pagination.page + pageItemIndex - 1;
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
      page = pageItem.page;
    }
    pageItem.props.onClick = (e) => {
      e.preventDefault();
      goTo(page);
    };
    getPageItemProps &&
      typeof getPageItemProps === 'function' &&
      (pageItem.props = Object.assign(
        pageItem.props,
        getPageItemProps(pageItemIndex, page, pageItem.props)
      ));
    return pageItem;
  };
};
