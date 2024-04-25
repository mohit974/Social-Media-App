import React from "react";
import { useSelector } from "react-redux";

import PropagateLoader from "react-spinners/PropagateLoader";

import Post from "./Post";

export default function Posts({ setCurrentId, setIsOpenMenu, isOpenMenu }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading)
    return (
      <div className="absolute top-[50%] left-[50%] text-white">
        No posts here, Go to the first page
      </div>
    );
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-xl flex-grow">
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%]">
          <PropagateLoader color="#3B82F6" />
        </div>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <Post
              post={post}
              setCurrentId={setCurrentId}
              setIsOpenMenu={setIsOpenMenu}
              isOpenMenu={isOpenMenu}
            />
          </div>
        ))
      )}
    </div>
  );
}
