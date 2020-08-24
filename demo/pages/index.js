import Highlight from '../components/Highlight';
import Demo from '../components/Demo';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="sm:mx-auto p-2" style={{ maxWidth: 1024 }}>
      <Header />
      <main className="space-y-8 mb-16">
        <Demo />

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
            {`import usePagination from '@lucasmogari/react-pagination';

// item = unit that is paginated
// page = group of items
// page item = a pagination element (can be a page number or a gap)

const {
page,
fromItem,
toItem,
getPageItem,
totalPages,
size,             // size of the pagination, considering arrows and numbers
numbers,          // show numbers
arrows,           // show arrows
goTo,             // go to a specific page (page number, 'previous', 'next')
previous,         // go to the previous page
next,             // go to the next page
totalItems,
setTotalItems,
itemsPerPage,
setItemsPerPage,
maxPageItems,
setMaxPageItems,
} = usePagination({
  totalItems,     // [1, Infinity]
  page,           // [1, totalPages] - default 1
  itemsPerPage,   // [1, Infinity] - default 24
  maxPageItems,   // [1, Infinity] - default 7
  numbers,        // default true
  arrows,         // default true
});`}
          </Highlight>
        </div>

        <div>
          <h3>License</h3>@lucasmogari/react-pagination is available under the MIT License.
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
