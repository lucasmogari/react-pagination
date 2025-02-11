import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import Demo from '../components/Demo';
import Header from '../components/Header';
import Highlight from '../components/Highlight';

const Example = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 3000);
  }, []);
  return ready ? (
    <iframe
      src="https://codesandbox.io/embed/lucasmogari-react-pagination-example-ncqk0?fontsize=14&hidenavigation=1&theme=dark"
      style={{ width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden' }}
      title="@lucasmogari/react-pagination example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
  ) : 'Loading CodeSandbox...';
};

const Home = (props) => {
  const router = useRouter();

  let page = props.page;
  if (!page) {
    return null;
  }

  const { slug } = router.query;
  let slugPage;
  if (slug) {
    if (slug.length === 2) {
      slugPage = parseInt(slug[1]);
    }
  } else {
    slugPage = 1;
  }
  if (slugPage !== page) {
    page = slugPage;
  }
  const title = `${page > 1 ? `Page ${page} - ` : ''}React Pagination`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-4 sm:mx-auto" style={{ maxWidth: 1024 }}>
        <Header />
        <main className="mb-16 space-y-10">
          <Demo page={page} />

          <div>
            <h3 className="mb-1 text-xl">Install</h3>
            <Highlight language="bash">
              {`npm install @lucasmogari/react-pagination --save
# or 
yarn add @lucasmogari/react-pagination`}
            </Highlight>
          </div>

          <div>
            <h3 className="mb-1 text-xl">Usage</h3>
            <Highlight language="javascript">
              {`// item = unit that is paginated
// page = group of items
// page item = a pagination element (can be a page number or a gap)


import usePagination from '@lucasmogari/react-pagination';


// INPUT:

const pagination = usePagination({
  totalItems,           // [1, Infinity]
  page,                 // [1, totalPages] - default 1
  itemsPerPage,         // [1, Infinity] - default 24
  maxPageItems,         // [1, Infinity] - default 7
  numbers,              // default true
  arrows,               // default true
  getPageItemProps,     // function that resolves any props for a page item (will return in the props from getPageItem())
});


// OUTPUT:

// Variables:
const {
  page,                 // current page
  totalPages,           // total number of pages
  fromItem,             // first item of the page
  toItem,               // last item of the page
  size,                 // size of the pagination, considering arrows and numbers
  numbers,              // show numbers
  arrows,               // show arrows
  totalItems,           // valid total number of items
  itemsPerPage,         // valid number of items per page
  maxPageItems,         // valid maximum number of page items
} = pagination;

// Functions:
const {
  getPageItem(page ITEM | 'previous' | 'next'),     // returns information about the page item (see below)
  goTo(page NUMBER | 'previous' | 'next'),          // go to a specific page
  previous(),                                       // go to the previous page
  next(),                                           // go to the next page
  setTotalItems(totalItems),                        // update the total number of items
  setItemsPerPage(itemsPerPage),                    // update the number of items per page
  setMaxPageItems(maxPageItems),                    // update the maximum number of page items
} = pagination;

// getPageItem
const {
  page,                 // the page correspondent to the page item
  props,                // component props
  disabled,             // indicate if the page item is disabled
  current,              // indicate if the page item is the current page
} = getPageItem(page ITEM);
`}
            </Highlight>
          </div>

          <div>
            <h3 className="mb-1 text-xl">Example</h3>
            <Example />
          </div>
        </main>

        <footer className="mb-8">
          <h3 className="mb-1 text-xl">License</h3>@lucasmogari/react-pagination is available under
          the MIT License.
        </footer>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: [] } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const page = slug?.length === 2 && slug[0] === 'page' ? parseInt(slug[1], 10) : 1;

  return {
    props: {
      page,
    },
  };
}

export default Home;
