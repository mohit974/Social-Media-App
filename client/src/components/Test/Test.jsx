import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/posts";

export default function Posts() {
  const dispatch = useDispatch();
  const fetchAllPosts = () => {
    dispatch(fetchPosts(2));
  };
  const posts = useSelector((state) => state.posts.posts);
  // const getting = () => {
  //   fetchPosts(1)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // };
  return (
    <div className="border border-red-500 w-full flex justify-center items-center">
      <button onClick={fetchAllPosts}>hello</button>
      <button
        onClick={() => {
          console.log(posts);
        }}
      >
        jello
      </button>
    </div>
  );
}
