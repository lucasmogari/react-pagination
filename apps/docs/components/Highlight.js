import hljs from 'highlight.js/lib/core';
import React from 'react';

const Highlight = ({ children, language }) => {
  const ref = React.useRef();

  React.useEffect(() => void hljs.highlightElement(ref.current), []);

  return (
    <pre className="block overflow-hidden rounded">
      <code className={language} ref={ref}>
        {children}
      </code>
    </pre>
  );
};

export default Highlight;
