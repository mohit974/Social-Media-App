import React from "react";
import { useSelector } from "react-redux";

import PropagateLoader from "react-spinners/PropagateLoader";

import Post from "./Post";

export default function Posts({ setCurrentId, setIsOpenMenu, isOpenMenu }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading)
    return (
      <div className="absolute top-0 left-[40%] mt-4 text-white">
        No posts here, Go to the another page
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
