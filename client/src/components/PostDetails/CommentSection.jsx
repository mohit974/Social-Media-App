import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../reducers/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const selectedComments = useSelector(
    (state) => state.posts.posts.find((post) => post._id === post._id)?.comments
  );

  useEffect(() => {
    if (selectedComments) {
      setComments(selectedComments);
    }
  }, [selectedComments]);

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    await dispatch(
      commentPost({
        value: finalComment,
        id: post._id,
      })
    );

    setComment("");
  };

  return (
    <div className="p-4 -ml-4 text-white flex sm:flex-row flex-col mt-2 space-x-2">
      <div className="flex-grow mb-4">
        <h6 className="font-bold mb-2 text-2xl">
          {post?.comments.length}
          &nbsp;{post?.comments.length < 2 ? "Comment" : "Comments"}
        </h6>
        <div
          className={`max-h-[200px] overflow-y-auto max-w-3xl rounded-lg p-2 ${
            post?.comments.length ? "bg-gray-600" : ""
          }`}
        >
          {comments?.map((c, i) => (
            <div key={i} className="mb-2">
              <strong className="text-purple-300">{c.split(": ")[0]}</strong>
              <span className="text-gray-100">{c.split(":")[1]}</span>
              {post?.comments.length > 1 ? <hr className="mt-3" /> : ""}
            </div>
          ))}
        </div>
      </div>
      {user?.result?.name ? (
        <div className="sm:w-3/4 w-full right-10 max-w-xl sm:mt-2">
          <h6 className="font-bold mb-2">Write a comment</h6>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2 bg-neutral-900"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-black rounded mt-2"
            disabled={!comment.length}
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      ) : (
        <div className="sm:w-3/4 w-full right-10 max-w-xl sm:mt-2">
          <div className="text-white flex justify-center text-lg md:text-2xl w-full p-2">
            Sign in to comment on the post
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
