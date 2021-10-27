import highlightjs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/index.css';

highlightjs.registerLanguage('javascript', javascript);
highlightjs.registerLanguage('bash', bash);

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>React Pagination</title>
        <meta name="description" content="Headless react hook for pagination" />
      </Head>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
