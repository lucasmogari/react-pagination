import { readFileSync } from 'fs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { join } from 'path';
import { getPageFiles } from 'next/dist/server/get-page-files';

function getDocumentFiles(buildManifest, pathname) {
  const sharedFiles = getPageFiles(buildManifest, '/_app');
  const pageFiles = pathname !== '/_error' ? getPageFiles(buildManifest, pathname) : [];
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])],
  };
}

class InlineStylesHead extends Head {
  getCssLinks() {
    return this.__getInlineStyles();
  }

  __getInlineStyles() {
    const { assetPrefix } = this.context;
    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page);
    if (!files || files.allFiles.length === 0) return null;

    return files.allFiles
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
          }}
        />
      ));
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="antialiased">
        <InlineStylesHead />
        <body className="text-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
