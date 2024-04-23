import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import snapsText from "../../images/snaps-text.png";
import { fetchPost, fetchPostsBySearch } from "../../reducers/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        fetchPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <>
        <div className="absolute top-1 left-10">
          <Link to="/" className="-mb-2">
            <img
              src={snapsText}
              alt="icon"
              className="md:size-[120px] invert"
            />
          </Link>
        </div>
        <div className="absolute top-[50%] left-[50%]">
          <PropagateLoader color="#36d7b7" />
        </div>
      </>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className="flex flex-col p-4 rounded shadow-lg text-white">
      <div className="absolute top-1 left-10">
        <Link to="/" className="-mb-2">
          <img src={snapsText} alt="icon" className="md:size-[120px] invert" />
        </Link>
      </div>
      <div className="flex flex-col mb-4 mt-24 ml-6 mr-3">
        <div className="flex flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-500 mb-2 text-lg">
              {post.tags.map((tag) => `#${tag} `)}
            </p>
            <p className="mb-2 text-2xl">{post.message}</p>
            <p className="text-gray-500 text-xl">Created by: {post.name}</p>
            <p className="text-gray-500 text-xl">
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
          <div className="w-full md:w-1/2 -mt-10">
            <img
              className="w-full h-96 object-cover rounded-2xl"
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </div>
        <div>
          <CommentSection post={post} />
        </div>
        {!!recommendedPosts.length && (
          <div className="mb-4 mt-2">
            <h5 className="font-bold mb-2 text-2xl text-blue-300">
              You might also like:
            </h5>
            <div className="grid grid-cols-3 gap-4">
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFile, _id, tags }) => (
                  <div
                    className="cursor-pointer"
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <h6 className="font-bold mb-2 text-lg">{title}</h6>
                    <p className="text-gray-500 mb-2 text-lg">
                      {post.tags.map((tag) => `#${tag} `)}
                    </p>
                    <p className="mb-2 text-md">{message}</p>
                    <p className="mb-2 text-base text-blue-300">
                      {likes.length}&nbsp;Likes
                    </p>
                    <p className="mb-2 text-md text-gray-500">{name}</p>
                    <img
                      src={selectedFile}
                      className="w-full max-h-48 object-cover rounded"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
