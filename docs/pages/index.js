import Highlight from '../components/Highlight';
import Demo from '../components/Demo';
import Header from '../components/Header';

const Home = ({ page }) => {
  return (
    <div className="sm:mx-auto p-2" style={{ maxWidth: 1024 }}>
      <Header />
      <main className="space-y-10 mb-16">
        <Demo page={page} />

        <div>
          <h3>Install</h3>
          <Highlight language="bash">
            {`npm install @lucasmogari/react-pagination --save
# or 
yarn add @lucasmogari/react-pagination`}
          </Highlight>
        </div>

        <div>
          <h3>Usage</h3>
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
          <h3>Example</h3>
          <Highlight language="javascript">
            {`const {
  fromItem,
  toItem,
  totalItems,
  getPageItem,
  size,
} = usePagination({
  totalItems: 100,
  page: 1,            // default
  itemsPerPage: 24,   // default
  maxPageItems: 7,    // default
  numbers: true,      // default
  arrows: true,       // default
});

return (
  <div>
    <p>
      Items {fromItem}-{toItem} of {totalItems}
    </p>
    <ul style={{ display: 'flex' }}>
      {[...Array(size)].map((_, i) => {
        const { page, props } = getPageItem(i);
        return (
          <li key={i}>
            <button {...props} style={{ margin: '.5rem' }}>
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);
`}
          </Highlight>
        </div>
      </main>

      <footer className="mb-8">
        <h3>License</h3>@lucasmogari/react-pagination is available under the MIT License.
      </footer>
    </div>
  );
};

export default Home;
