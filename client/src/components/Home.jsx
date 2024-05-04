import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { fetchPosts } from "../reducers/posts";

// components
import Form from "./Form";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

import Posts from "./Posts/Posts";

import Pagination from "./Pagination-2";
import RightSidebar from "./RightSidebar";

import SearchComponent from "./SearchComponent";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tagsFromUrl = query.get("tags") ? query.get("tags").split(",") : [];
  const { isLoading } = useSelector((state) => state.posts);

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page]);

  return (
    <div className="flex justify-center items-center lg:flex-row flex-col m-2 space-x-2">
      <div className="hidden lg:block w-1/4">
        <LeftSidebar>
          <Navbar />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </LeftSidebar>
      </div>
      <div className="flex flex-col lg:hidden w-full">
        <Navbar />
        <div className="my-2 ml-2">
          {!isOpenMenu ? (
            <button type="button" onClick={openMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                ></path>
              </svg>
            </button>
          ) : (
            <button type="button" onClick={openMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                onClick={openMenu}
              >
                <path
                  fill="white"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                ></path>
              </svg>
            </button>
          )}
          {isOpenMenu && (
            <div className="fixed left-0 w-2/3 h-fit z-50 bg-black/50 bg-opacity-80 rounded-xl pt-2">
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                isOpenMenu
              />
              <SearchComponent />{" "}
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-2/4 flex flex-col justify-center items-center">
        <Posts
          setCurrentId={setCurrentId}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
        {isLoading || (
          <div className="mt-1 w-fit xl:hidden">
            <Pagination page={page} />
          </div>
        )}
      </div>
      <div className="xl:flex xl:flex-col xl:w-1/4 hidden">
        <RightSidebar>
          <SearchComponent />
          <div>
            {!searchQuery && !tagsFromUrl.length && <Pagination page={page} />}
          </div>
        </RightSidebar>
      </div>
    </div>
  );
}
