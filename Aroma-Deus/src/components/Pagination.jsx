import PropTypes from "prop-types";
import { Link } from "react-router";

function Pagination({ count, page, setPage }) {
  const maxPage = Math.ceil(count / 9);
  return (
    <div className="flex items-center justify-between border-t border-[#758694] bg-[#FEFAF6] px-4 py-3 sm:px-6 mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page <= 1}
          className="relative inline-flex items-center rounded-md border border-[#758694] bg-white px-4 py-2 text-sm font-medium text-[#405D72] hover:bg-[#F7E7DC] disabled:opacity-50">
          Previous
        </button>
        <button
          onClick={() => page < maxPage && setPage(page + 1)}
          disabled={page >= maxPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-[#758694] bg-white px-4 py-2 text-sm font-medium text-[#405D72] hover:bg-[#F7E7DC] disabled:opacity-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[#758694]">
            Showing
            <span className="font-medium"> {(page - 1) * 9 + 1} </span>
            to
            <span className="font-medium">
              {" "}
              {page * 9 > count ? count : page * 9}{" "}
            </span>
            of
            <span className="font-medium"> {count} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            {page > 1 && (
              <Link
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[#758694] ring-1 ring-inset ring-[#758694] hover:bg-[#F7E7DC] focus:z-20 focus:outline-offset-0"
                onClick={() => page > 1 && setPage(page - 1)}>
                <span className="sr-only">Previous</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon">
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
            <input
              type="text"
              value={page}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= maxPage) {
                  setPage(value);
                }
              }}
              className="relative inline-flex items-right px-2 py-2 text-sm font-semibold ring-1 ring-inset ring-[#758694] focus-visible:outline-0 w-12 text-center"
            />
            <span className="relative inline-flex items-center text-white bg-[#758694] px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-[#758694]">
              / {maxPage}
            </span>
            {page < maxPage && (
              <Link
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-[#758694] ring-1 ring-inset ring-[#758694] hover:bg-[#F7E7DC] focus:z-20 focus:outline-offset-0"
                onClick={() => page < maxPage && setPage(page + 1)}>
                <span className="sr-only">Next</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon">
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
            {page == maxPage && (
              <div className="relative inline-flex items-center rounded-r-md px-2 py-2 opacity-0 shadow-none">
                <span className="sr-only">Next</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon">
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
