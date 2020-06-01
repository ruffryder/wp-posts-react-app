import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import "./Post.css";

function Post({ post }) {
  const excerpt = post.excerpt.rendered;
  // Sanitize the received HTML with sanitizeHtml function
  const sanitizedExcerpt = sanitizeHtml(excerpt, {
    allowedTags: ["p"],
  });
  return (
    <div
      className="post"
      dangerouslySetInnerHTML={{ __html: sanitizedExcerpt }}
    />
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Post;
