import Pagination, { RootPagination } from './Pagination';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PageItemButton from './PageItemButton';
import PageGap from './PageGap';
import { VisuallyHidden } from 'reakit/VisuallyHidden';
import usePagination from '@lucasmogari/react-pagination';

const StringPagination = ({ start = 1, string, pagination }) =>
  [...Array(string.length)].map((_, i) => {
    const page = start + i;

    return (
      <PageItemButton
        key={i}
        current={pagination.page === page}
        page={string.charAt(i)}
        // style={{ paddingLeft: 10, paddingRight: 10 }}
        className="px-8px sm:px-3"
        onClick={(e) => {
          e.preventDefault();
          pagination.goTo(page);
        }}
      />
    );
  });

const Header = () => {
  const pagination = usePagination({ itemsPerPage: 1, totalItems: 15 });

  return (
    <header className="my-10 text-center">
      <VisuallyHidden>
        <h1>react-pagination</h1>
      </VisuallyHidden>
      <RootPagination
        className="inline-flex flex-wrap items-center mb-4"
        pages={
          <>
            <div className="flex items-center">
              <PreviousButton {...pagination.getPageItem('previous').props} label="" />

              <StringPagination string="react" pagination={pagination} />

              <PageGap />
            </div>

            <div className="flex items-center">
              <StringPagination start={6} string="pagination" pagination={pagination} />
              <NextButton {...pagination.getPageItem('next').props} label="" />
            </div>
          </>
        }
      />
      <h2 className="text-gray-600">Headless react hook for pagination</h2>
    </header>
  );
};

export default Header;
