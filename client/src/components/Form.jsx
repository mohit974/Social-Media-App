import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../reducers/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(
        createPost({
          post: { ...postData, name: user?.result?.name },
          navigate: navigate,
        })
      );
      clear();
    } else {
      dispatch(
        updatePost({
          id: currentId,
          post: { ...postData, name: user?.result?.name },
        })
      );

      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 mt-2 mx-4 rounded-2xl px-8 pt-4 pb-4 mb-2 shadow-md">
        <p className="text-center text-lg text-white">
          Please sign in to create your own snaps and to like/comment on others'
          snaps.{" "}
        </p>
      </div>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-700 mt-2 mx-4 rounded-2xl px-8 pt-4 pb-4 mb-2 shadow-md overflow-clip">
      <form autoComplete="off" noValidate>
        <h2 className="text-lg font-bold text-white truncate">
          {currentId ? `Editing "${post?.title}"` : "Create a Snap"}
        </h2>
        <input
          name="title"
          className="p-2 mt-4 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          name="message"
          className="p-2 mt-4 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
          placeholder="Message"
          rows="3"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className="flex flex-wrap mt-4">
          {postData.tags.map((tag, index) => (
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
            className="p-2 mt-2 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
            id="tagInput"
            type="text"
            placeholder="Tags"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddChip(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
        <div className="mt-4">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
          type="button"
          onClick={clear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
