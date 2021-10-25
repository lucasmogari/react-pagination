export const getPagination = ({
  totalItems,
  page = 1,
  itemsPerPage = 24,
  maxPageItems = 7,
  numbers = true,
  arrows = true,
}) => {
  (!page || page < 1) && (page = 1);
  (!itemsPerPage || itemsPerPage < 1) && (itemsPerPage = 1);
  (!maxPageItems || maxPageItems < 0) && (maxPageItems = 0);
  (!totalItems || totalItems < 0) && (totalItems = 0);

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 0;
  if (page < 1) {
    page = totalItems > 0 ? 1 : 0;
  } else if (page > totalPages) {
    page = totalPages;
  }

  let size = numbers ? (maxPageItems > totalPages ? totalPages : maxPageItems) : 0;
  arrows && (size += 2);

  const startItem = page < 1 ? 0 : (page - 1) * itemsPerPage;
  const fromItem = totalItems > 0 ? startItem + 1 : 0;

  let toItem;
  if (totalItems < itemsPerPage) {
    toItem = totalItems;
  } else {
    toItem = startItem + itemsPerPage;
    if (toItem > totalItems) {
      toItem = startItem + (totalItems % startItem);
    }
  }

  return {
    fromItem,
    toItem,
    totalItems,
    maxPageItems,
    size,
    page,
    itemsPerPage,
    totalPages,
    numbers,
    arrows,
  };
};
