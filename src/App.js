import React, { Component } from "react";
import axios from "axios";
import * as constants from "./constants";
import Header from "./components/Header/Header";
import PostsList from "./components/PostsList/PostsList";
import Button from "./components/UI/Button/Button";
/* eslint-disable react/no-unused-state, no-console */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postsOffset: constants.POSTS_OFFSET,
    };
  }

  componentDidMount() {
    const { postsOffset } = this.state;
    axios
      .get(
        `https://renemorozowich.com/wp-json/wp/v2/posts?_embed&per_page=${constants.POSTS_PER_PAGE}&offset=${postsOffset}`,
      )
      .then((res) => {
        this.setState((prevState) => ({
          posts: res.data,
          postsOffset: prevState.postsOffset + constants.POSTS_OFFSET,
        }));
      })
      .catch((error) => console.log(error));
  }

  handleLoadMorePosts = () => {
    const { postsOffset } = this.state;
    axios
      .get(
        `https://renemorozowich.com/wp-json/wp/v2/posts?_embed&per_page=${constants.POSTS_PER_PAGE}&offset=${postsOffset}`,
      )
      .then((res) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...res.data],
          postsOffset: prevState.postsOffset + constants.POSTS_OFFSET,
        }));
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <Header />
        <PostsList posts={posts} />
        <Button
          textValue="Load more posts"
          clickHandler={this.handleLoadMorePosts}
        />
      </div>
    );
  }
}

export default App;
