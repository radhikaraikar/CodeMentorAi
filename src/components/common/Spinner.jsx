const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const Spinner = ({ size = 'md', className = '' }) => {
  return (
    <div
      className={`
        ${sizes[size] || sizes.md}
        border-indigo-500/30 border-t-indigo-500
        rounded-full animate-spin flex-shrink-0
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
