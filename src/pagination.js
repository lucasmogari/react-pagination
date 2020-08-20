export const getPagination = ({
  page = 1,
  totalItems,
  itemsPerPage,
  maxPageItems = 7,
  numbers = true,
  arrows = true,
}) => {
  if (itemsPerPage < 1) {
    itemsPerPage = 1;
  } else if (itemsPerPage > totalItems) {
    itemsPerPage = totalItems;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 0;
  if (page < 1) {
    page = 1;
  } else if (page > totalPages) {
    page = totalPages;
  }

  let size = numbers ? (maxPageItems > totalPages ? totalPages : maxPageItems) : 0;
  arrows && (size += 2);

  const startItem = (page - 1) * itemsPerPage;
  const fromItem = startItem + 1;

  let toItem = startItem + itemsPerPage;
  if (toItem > totalItems) {
    toItem = startItem + (totalItems % startItem);
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
