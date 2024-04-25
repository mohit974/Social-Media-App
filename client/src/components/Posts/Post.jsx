import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../reducers/posts";

const Post = ({ post, setCurrentId, setIsOpenMenu, isOpenMenu }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
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

  const toggleMessageVisibility = () => {
    setIsMessageVisible(!isMessageVisible);
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

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <div className="lg:w-[700px] xl:max-w-full bg-neutral-900 border border-neutral-700 rounded-xl shadow-md overflow-hidden my-1 relative hover:cursor-default">
      <div className="flex p-4">
        <div>
          <span className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-center font-bold text-lg">
            {getInitials(post?.name)}
          </span>
        </div>
        <div className="ml-4">
          <div className="uppercase tracking-wide text-sm text-[#36d7b7] font-semibold mt-1">
            {post.name}
            <span className="text-gray-500 rounded-full size-12 mx-2 inline">
              •
            </span>
            <span className="text-gray-500 text-sm lowercase">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="hover:cursor-pointer" onClick={openPost}>
            <p className="block mt-4 text-lg leading-tight font-medium text-blue-500 hover:underline">
              {post.title}
            </p>
          </div>
          {isMessageVisible ? (
            <div className="mt-2">
              <p className="text-white">
                {post.message}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  onClick={toggleMessageVisibility}
                  className="hover:cursor-pointer inline"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="#36d7b7"
                      d="M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.122l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12z"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-white">
                {post.message.split(" ").splice(0, 25).join(" ")}...&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  onClick={toggleMessageVisibility}
                  className="hover:cursor-pointer inline"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="#36d7b7"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
          )}
          <p className="text-gray-400 mt-2">
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
          {user?.result ? (
            <button type="button" disabled={!user?.result} onClick={handleLike}>
              <Likes />
            </button>
          ) : (
            <div className="flex flex-row mt-1 ml-1 space-x-2 ">
              <button type="button" className="cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="gray"
                    d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
                  ></path>
                </svg>
              </button>
              <div className="text-[#808080] text-lg">
                {likes.length}
                <span className="ml-2 text-base">
                  {likes.length > 2 ? "Likes" : "Like"}
                </span>
              </div>
            </div>
          )}
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
                setIsOpenMenu(!isOpenMenu);
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
