import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../reducers/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-4 -ml-4 text-white flex mt-2">
      <div className="flex-grow mb-4">
        <h6 className="font-bold mb-2 text-2xl">
          {post?.comments.length}
          &nbsp;{post?.comments.length < 2 ? "Comment" : "Comment"}
        </h6>
        <div className="max-h-[200px] overflow-y-auto max-w-3xl bg-gray-600 rounded-lg p-2">
          {comments?.map((c, i) => (
            <p key={i} className="mb-2">
              <strong className="text-purple-300">{c.split(": ")[0]}</strong>
              <span className="text-gray-100">{c.split(":")[1]}</span>
              {post?.comments.length > 1 ? <hr className="mt-3" /> : ""}
            </p>
          ))}
        </div>
        <div ref={commentsRef} />
      </div>
      {!user?.result?.name && (
        <div className="w-3/4 right-10 max-w-xl">
          <h6 className="font-bold mb-2">Write a comment</h6>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
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
      )}
    </div>
  );
};

export default CommentSection;
