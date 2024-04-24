import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../reducers/posts";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async (e) => {
    e.stopPropagation();
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <div className="flex space-x-2 mt-2 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#36d7b7"
              d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
            ></path>
          </svg>
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others liked`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div className="flex space-x-2 mt-2 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#36d7b7"
              d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
            ></path>
          </svg>
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </div>
      );
    }

    return (
      <div className="flex space-x-2 mt-2 ml-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#36d7b7"
            d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
          ></path>
        </svg>
        &nbsp;Like
      </div>
    );
  };

  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

  const getInitials = (name = "N/A") => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <div className="w-[700px] max-w-full bg-[#1B1A55] rounded-xl shadow-md overflow-hidden my-1 relative hover:cursor-default">
      <div className="flex p-4">
        <div>
          <span className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-center font-bold text-lg">
            {getInitials(post?.name)}
          </span>
        </div>
        <div className="ml-4">
          <div className="uppercase tracking-wide text-sm text-white font-semibold mt-1">
            {post.name}
            <span className="text-gray-500 rounded-full size-12 mx-2 inline">
              •
            </span>
            <span className="text-gray-500 text-sm lowercase">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="hover:cursor-pointer" onClick={openPost}>
            <p className="block mt-4 text-lg leading-tight font-medium text-white hover:underline">
              {post.title}
            </p>
          </div>

          <p className="mt-2 text-white">
            {post.message.split(" ").splice(0, 25).join(" ")}...
          </p>
          <p className="text-white mt-2">
            {post.tags.map((tag) => `#${tag} `)}
          </p>
          <div className="mt-2">
            <img
              className="h-1/2 w-full object-cover rounded-xl aspect-video"
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
          <button type="button" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </button>
        </div>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className="">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              className="text-gray-500 text-xl mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
                </g>
              </svg>
            </button>
          </div>{" "}
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deletePost(post._id));
              }}
              className="text-red-500 text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
