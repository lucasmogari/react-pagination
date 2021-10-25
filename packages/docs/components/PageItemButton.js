import classnames from 'classnames';

const PageItemButton = ({ ariaLabel, children, className, current, page, ...props }) => {
  if (page) {
    if (ariaLabel) {
      if (typeof ariaLabel === 'function') {
        ariaLabel = ariaLabel(page);
      }
    } else {
      ariaLabel = `Page ${page}`;
      if (current) {
        ariaLabel += ', Current Page';
      }
    }
  }
  return (
    <button
      className={classnames(
        className,
        'px-3 py-1 border border-white rounded hover:border-gray-300 disabled:text-gray-500 disabled:pointer-events-none select-none focus:outline-none focus:border-blue-600',
        { 'bg-blue-600 border-blue-600 hover:border-blue-600 text-white': current }
      )}
      aria-label={ariaLabel}
      {...props}>
      {page || children}
    </button>
  );
};

export default PageItemButton;
