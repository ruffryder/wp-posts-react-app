import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
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
    };
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

  render() {
    const { isLoading, posts } = this.state;
    return (
      <div className="container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <PostDetails key={post.id} post={post} />)
        )}
      </div>
    );
  }
}

PostsDetailsList.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(PostsDetailsList);
