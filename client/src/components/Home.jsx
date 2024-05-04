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
      <div className="flex lg:hidden w-full">
        <Navbar
          openMenu={openMenu}
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      </div>
      <div className="w-full lg:w-2/4 flex flex-col justify-center items-center">
        <Posts
          setCurrentId={setCurrentId}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
        {isLoading || (
          <div className="mt-1 w-fit xl:hidden">
            {!searchQuery && !tagsFromUrl.length && <Pagination page={page} />}
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
