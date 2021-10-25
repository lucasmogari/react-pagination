import React from 'react';
import ReactDOM from 'react-dom';
import usePagination from './src';

const Demo = () => {
  const {
    page: currentPage,
    fromItem,
    toItem,
    totalItems,
    getPageItem,
    size,
    ...e
  } = usePagination({
    totalItems: 100,
    page: 1, // default
    itemsPerPage: 24, // default
    maxPageItems: 7, // default
    numbers: true, // default
    arrows: true, // default
  });

  return (
    <div>
      <p>
        Items {fromItem}-{toItem} of {totalItems}
      </p>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        {[...Array(size)].map((_, i) => {
          const { page, props } = getPageItem(i);
          console.log(page, i);
          return (
            <li key={i}>
              <button
                {...props}
                style={{ margin: '.5rem', fontWeight: page === currentPage ? 'bold' : null }}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
