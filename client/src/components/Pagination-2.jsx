import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = ({ className, page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);

  const getPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      if (i === 1 || i === numberOfPages || Math.abs(page - i) <= 2) {
        pageNumbers.push(i);
      } else if (i === 2 || i === numberOfPages - 1) {
        pageNumbers.push("...");
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center bg-neutral-900 border border-neutral-700 -mt-2 mx-4 rounded-2xl xl:px-8 pt-4 pb-4 mb-2 shadow-md space-x-2 px-2">
      <Link
        to={`/posts?page=${Number(page) - 1}`}
        className={`lg:py-2 lg:px-2 block  ${
          Number(page) === 1
            ? "bg-gray-300 cursor-not-allowed hidden"
            : "bg-neutral-800 text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mt-2 lg:mt-1 xl:mt-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {getPageNumbers().map((pageNumber, index) => (
        <div key={index} className="lg:text-lg">
          {pageNumber === "..." ? (
            <span className="block  bg-white text-blue-500">...</span>
          ) : (
            <Link
              to={`/posts?page=${pageNumber}`}
              className={`block py-2 px-4  ${
                pageNumber === Number(page)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              }`}
            >
              {pageNumber}
            </Link>
          )}
        </div>
      ))}

      <Link
        to={`/posts?page=${Number(page) + 1}`}
        className={`lg:py-2 lg:px-2 ${
          Number(page) === numberOfPages
            ? "bg-gray-300 cursor-not-allowed hidden"
            : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mt-2 lg:mt-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Paginate;
