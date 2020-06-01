import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import extractPostThumbnail from "./postUtils";
import "./Post.css";

function Post({ post }) {
  /* eslint-disable */
  // Passing our post prop to a utility method that returns the thumbnail url
  const postUrl = extractPostThumbnail(post);

  /* eslint-enable */
  const postExcerpt = post.excerpt.rendered;
  const postTitle = post.title.rendered;
  // Sanitize the received HTML with sanitizeHtml() function
  const sanitizedPostExcerpt = sanitizeHtml(postExcerpt, {
    allowedTags: ["p"],
  });
  const sanitizedPostTitle = sanitizeHtml(postTitle, { allowedTags: [""] });
  return (
    <div className="post">
      <h2 className="post__title">{sanitizedPostTitle}</h2>
      <img className="post__thumbnail" src={postUrl} alt={sanitizedPostTitle} />
      <div
        className="post__excerpt"
        dangerouslySetInnerHTML={{ __html: sanitizedPostExcerpt }}
      />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Post;
