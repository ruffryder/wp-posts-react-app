import React from "react";
import PropTypes from "prop-types";
import Post from "../Post/Post";

function PostsList({ posts }) {
  return (
    <div className="container">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;
