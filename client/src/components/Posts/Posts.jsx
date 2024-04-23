import React from "react";
import { useSelector } from "react-redux";

import PropagateLoader from "react-spinners/PropagateLoader";

import Post from "./Post";

export default function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading) return "No posts here, Go to the first page";
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-xl flex-grow">
      {isLoading ? (
        <PropagateLoader color="#36d7b7" />
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))
      )}
    </div>
  );
}
