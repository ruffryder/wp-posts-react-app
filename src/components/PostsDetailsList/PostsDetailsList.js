import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";
import { LOAD_SINGLE_POST } from "../../constants";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import PostDetails from "../PostDetails/PostDetails";
import "./PostsDetailsList.css";

/* eslint-disable no-console */
class PostsDetailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
      hasMorePosts: true,
    };
    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        getNextPost,
        state: { isLoading, posts, hasMorePosts },
      } = this;

      // Bails early if:
      // * it's already loading

      if (isLoading || !hasMorePosts) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        getNextPost(posts[posts.length - 1].date);
      }
    }, 100);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { id } = this.props.match.params;
    this.setState({
      isLoading: true,
    });
    axios
      .get(`https://renemorozowich.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, res.data],
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  // A function to get the next post on scroll to end
  getNextPost = (dateAfter) => {
    this.setState({
      isLoading: true,
    });
    axios
      .get(
        `https://renemorozowich.com/wp-json/wp/v2/posts/?_embed&per_page=${LOAD_SINGLE_POST}&after=${dateAfter}&order=asc`,
      )
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({
            hasMorePosts: false,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            posts: [...prevState.posts, res.data[0]],
            isLoading: false,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading, posts, hasMorePosts } = this.state;
    return (
      <>
        <div className="container">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            posts.map((post) => <PostDetails key={post.id} post={post} />)
          )}
        </div>
        {hasMorePosts ? null : (
          <p className="posts-details-message">
            There are no more posts to show
          </p>
        )}
      </>
    );
  }
}

PostsDetailsList.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(PostsDetailsList);
