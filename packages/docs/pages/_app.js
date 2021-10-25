import highlightjs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import Head from 'next/head';
import '../styles/index.css';

highlightjs.registerLanguage('javascript', javascript);
highlightjs.registerLanguage('bash', bash);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>React Pagination</title>
        <meta name="description" content="Headless react hook for pagination" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-176253904-1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-176253904-1');`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
