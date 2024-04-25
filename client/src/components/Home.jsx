import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

// components
import Form from "./Form";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

import Posts from "./Posts/Posts";

import Pagination from "./Pagination";
import RightSidebar from "./RightSidebar";

import { fetchPostsBySearch } from "../reducers/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tagsFromUrl = query.get("tags") ? query.get("tags").split(",") : [];

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { isLoading } = useSelector((state) => state.posts);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(fetchPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (searchQuery || tagsFromUrl.length > 0) {
      dispatch(
        fetchPostsBySearch({ search: searchQuery, tags: tagsFromUrl.join(",") })
      );
    }
  }, [searchQuery, tagsFromUrl, dispatch]);

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const SearchComponent = ({ className }) => {
    return (
      <div
        className={twMerge(
          `bg-neutral-900 border border-neutral-700 mt-5 m-4 rounded-2xl px-8 pt-6 pb-8 mb-4 shadow-md`,
          className
        )}
      >
        {" "}
        <h1 className="text-xl font-bold">Search Posts</h1>
        <form className="mt-4">
          <div className="mb-4">
            <input
              onKeyDown={handleKeyPress}
              name="search"
              className="p-2 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
              id="search"
              type="text"
              placeholder="Search Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              tabIndex="0"
            />
          </div>
          <div className="mb-4">
            <div id="tags" className="flex flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-semibold py-1 px-2 mr-2 mb-2 rounded"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleDeleteChip(tag)}
                    className="ml-2"
                  >
                    x
                  </button>
                </span>
              ))}
              <input
                className="p-2 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
                id="tagInput"
                type="text"
                placeholder="Search tags"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddChip(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={searchPost}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2"
              type="button"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center lg:flex-row flex-col m-2 space-x-2">
      <div className="hidden lg:block w-1/4">
        <LeftSidebar>
          <Navbar />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <div className="xl:hidden -mt-5 xl:mt-0">
            {" "}
            <SearchComponent />{" "}
          </div>
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
      <div className="w-full lg::w-2/4">
        <Posts
          setCurrentId={setCurrentId}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
      </div>
      <div className="xl:flex xl:flex-col xl:w-1/4 relative xl:static">
        <RightSidebar>
          <SearchComponent className="xl:block hidden" />
          <div className="md:absolute bottom-0 right-0 xl:static invisible sm:visible">
            {!searchQuery && !tagsFromUrl.length && <Pagination page={page} />}
          </div>
        </RightSidebar>
      </div>
    </div>
  );
}
