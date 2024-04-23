import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

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

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className="flex justify-center items-center m-2 space-x-2">
      <div className="w-1/4">
        <LeftSidebar>
          <Navbar />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </LeftSidebar>
      </div>
      <div className="w-2/4">
        <Posts setCurrentId={setCurrentId} />
      </div>
      <div className="w-1/4">
        <RightSidebar>
          <div className="bg-[#1B1A55] mt-5 m-4 rounded-2xl px-8 pt-6 pb-8 mb-4 shadow-md">
            {" "}
            <h1 className="text-xl font-bold">Search Posts</h1>
            <form className="mt-4">
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="search"
                >
                  Search
                </label>
                <input
                  onKeyDown={handleKeyPress}
                  name="search"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="search"
                  type="text"
                  placeholder="Search Title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  tabIndex="0"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="tags"
                >
                  Search Tags
                </label>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {!searchQuery && !tags.length && <Pagination page={page} />}
        </RightSidebar>
      </div>
    </div>
  );
}
