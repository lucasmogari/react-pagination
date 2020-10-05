import NextButton from './NextButton';
import PageGap from './PageGap';
import PageItemButton from './PageItemButton';
import PreviousButton from './PreviousButton';

export const RootPagination = ({ className, pages }) => (
  <nav role="navigation" aria-label="Pagination">
    <ul className={className}>{pages}</ul>
  </nav>
);

const Pagination = ({ className, pagination }) => {
  const pages = [];
  for (let i = 0; i < pagination.size; i++) {
    const pageItem = pagination.getPageItem(i);
    pages.push(
      <li key={i}>
        {pageItem.page === 'previous' ? (
          <PreviousButton {...pageItem.props} />
        ) : pageItem.page === 'next' ? (
          <NextButton {...pageItem.props} />
        ) : pageItem.page === 'gap' ? (
          <PageGap />
        ) : (
          <PageItemButton {...pageItem.props} current={pageItem.current} className="w-16">
            {pageItem.page}
          </PageItemButton>
        )}
      </li>
    );
  }
  return <RootPagination className={className} pages={pages} />;
};

export default Pagination;
