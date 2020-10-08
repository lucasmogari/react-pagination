import usePagination from '@lucasmogari/react-pagination';
import Pagination, { RootPagination } from './Pagination';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PageItemButton from './PageItemButton';
import PageGap from './PageGap';
import { useRouter } from 'next/router';

const Demo = ({ page = 1 }) => {
  // You only need to keep track os these states if you want to change the pagination state automatically.
  // Otherwise, use the functions returned from usePagination to change the state programmatically.
  // const [page, setPage] = React.useState(Number(initialPage))
  const [totalItems, setTotalItems] = React.useState(1000)
  const [itemsPerPage, setItemsPerPage] = React.useState(24)
  const [maxPageItems, setMaxPageItems] = React.useState(7)

  const router = useRouter();
  const pagination = usePagination({
    page: Number(page),
    totalItems,
    itemsPerPage,
    maxPageItems,
    getPageItemProps: React.useCallback((pageItemIndex, page, props) => {
      props.onClick = (e) => {
        e.preventDefault();
        router.push(`/page/${page}`);
      };
    }, []),
  });

  return (
    <div>
      <h3>Demo</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <label className="block">
            <span className="text-gray-700 mr-2">Total items</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.totalItems}
              style={{ width: 80 }}
              onChange={(e) => setTotalItems(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 mr-2">Items per page</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.itemsPerPage}
              style={{ width: 80 }}
              onChange={(e) => setItemsPerPage(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 mr-2">Max. page items</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.maxPageItems}
              style={{ width: 80 }}
              onChange={(e) => setMaxPageItems(e.target.value)}
            />
          </label>
        </div>

        <div className="space-y-2 p-2 rounded shadow">
          <p className="">
            <label htmlFor="page">Page</label>{' '}
            <input
              className="form-input"
              type="number"
              id="page"
              value={pagination.page}
              style={{ width: 80 }}
              onChange={(e) => {
                const page = e.target.value;
                if (page > 0 && page <= pagination.totalPages) {
                  router.push(`/page/${page}`);
                }
              }}
            />{' '}
            of {pagination.totalPages}
          </p>
          <p>
            Items {pagination.fromItem}-{pagination.toItem} of {pagination.totalItems}
          </p>
        </div>

        <div className="p-2 rounded shadow">
          <h4>Arrows only</h4>
          <RootPagination
            className="flex items-center space-x-1"
            pages={
              <>
                <li>
                  <PreviousButton {...pagination.getPageItem('previous').props} />
                </li>
                <li>
                  <NextButton {...pagination.getPageItem('next').props} />
                </li>
              </>
            }
          />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Numbers only</h4>
          <RootPagination
            className="flex flex-wrap items-center space-x-1"
            pages={[...Array(pagination.size - 2)].map((_, i) => {
              const { current, page, props } = pagination.getPageItem(i + 1);
              return page === 'gap' ? (
                <li key={i}>
                  <PageGap key={i} />
                </li>
              ) : (
                <li key={i}>
                  <PageItemButton
                    key={i}
                    current={current}
                    page={page}
                    className="w-16"
                    {...props}
                  />
                </li>
              );
            })}
          />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Arrows and numbers</h4>
          <Pagination className="flex flex-wrap items-center space-x-1" pagination={pagination} />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Infinity</h4>
          <RootPagination
            className="flex flex-wrap items-center"
            pages={[...Array(pagination.totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <li key={i}>
                  <PageItemButton
                    key={i}
                    current={pagination.page === page}
                    page={page}
                    className="w-16"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/page/${page}`);
                    }}
                  />
                </li>
              );
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
