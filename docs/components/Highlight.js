import hljs from 'highlight.js/lib/core';

const Highlight = ({ children, language }) => {
  const ref = React.useRef();

  React.useEffect(() => void hljs.highlightBlock(ref.current), []);

  return (
    <pre className="block rounded overflow-hidden">
      <code className={language} ref={ref}>
        {children}
      </code>
    </pre>
  );
};

export default Highlight;
