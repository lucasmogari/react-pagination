import classnames from 'classnames';

const Input = ({ className, ...props }) => (
  <input
    className={classnames(
      'w-full mt-1 border-gray-300 rounded-md shadow-sm form-input focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-5',
      className
    )}
    type="number"
    {...props}
  />
);

export default Input;
