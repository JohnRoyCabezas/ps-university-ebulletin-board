import ReactPaginate from 'react-paginate';

const Paginate = ({ page, pageCount, onPageChange }) => {

  return (
    <ReactPaginate
      className="flex items-center space-x-1"
      forcePage={page-1}
      activeLinkClassName={`border-regal-blue border-2`}
      pageLinkClassName={`hover:bg-gray-400 bg-gray-200 rounded p-3`}
      pageCount={pageCount}
      onPageChange={onPageChange}
      previousLabel={
        <button
          disabled={page === 1 ? true : false}
          className={`{${
            page === 1 && 'disable'
          } flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>
      }
      nextLabel={
        <button
          disabled={page === pageCount ? true : false}
          className={`{${
            page === pageCount && 'disable'
          } flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      }
    />
  );
};

export default Paginate;
