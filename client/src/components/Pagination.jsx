import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPosts } from "../reducers/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page]);

  const handlePrevious = () => {
    if (page > 1) {
      dispatch(fetchPosts(page - 1));
    }
  };

  const handleNext = () => {
    if (page < numberOfPages) {
      dispatch(fetchPosts(page + 1));
    }
  };

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
    <div className="flex justify-center bg-neutral-900 border border-neutral-700 -mt-2 mx-4 rounded-2xl px-8 pt-4 pb-4 mb-2 shadow-md space-x-2">
      <button
        onClick={handlePrevious}
        className={`py-2 px-2  ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-neutral-800 text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        }`}
        disabled={page === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <div key={index} className="text-lg">
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

      <button
        onClick={handleNext}
        className={`py-2 px-2 ${
          page === numberOfPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        }`}
        disabled={page === numberOfPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </button>
    </div>
  );
};

export default Paginate;
