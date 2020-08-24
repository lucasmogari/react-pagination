import classnames from 'classnames';
import PageItemButton from './PageItemButton';

const PreviousButton = ({ ariaLabel = 'Previous', label = 'Previous', ...props }) => (
  <PageItemButton {...props} className="flex items-center text-blue-700" aria-label={ariaLabel}>
    <svg
      className={classnames('w-2 h-3', { 'mr-2': label })}
      viewBox="0 0 320 512"
      fill="currentColor">
      <path
        fill="currentColor"
        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
      />
    </svg>
    {label}
  </PageItemButton>
);

export default PreviousButton;
