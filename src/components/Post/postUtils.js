export default function extractPostThumbnail(post) {
  /* eslint-disable */
  return post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail
    .source_url;
  /* eslint-enable */
}
