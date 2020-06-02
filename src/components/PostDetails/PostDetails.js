import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import extractPostThumbnail from "../Post/postUtils";
import "./PostDetails.css";

function PostDetails({ post }) {
  /* eslint-disable */
  // Passing our post prop to a utility method that returns the thumbnail url
  const postUrl = extractPostThumbnail(post);

  /* eslint-enable */
  const postContent = post.content.rendered;
  const postAuthor = post.author;
  const postDate = post.date;
  console.log(postDate);
  const postTitle = post.title.rendered;
  // Sanitize the received HTML with sanitizeHtml() function
  const sanitizedPostContent = sanitizeHtml(postContent, {
    allowedTags: ["p", "h2"],
  });
  const sanitizedPostTitle = sanitizeHtml(postTitle, { allowedTags: [""] });
  return (
    <div className="post-details">
      <h2 className="post-details__title">{sanitizedPostTitle}</h2>
      <div className="post-details__meta">
        <span className="post-details__meta__author">
          {" "}
          {`Posted by ${postAuthor}`}
        </span>
        <span className="post-details__meta__date">{postDate}</span>
      </div>
      <img
        className="post-details__thumbnail"
        src={postUrl}
        alt={sanitizedPostTitle}
      />
      <div
        className="post-details__content"
        dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}
      />
    </div>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default PostDetails;
