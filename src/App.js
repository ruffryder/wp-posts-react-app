import React, { Component } from "react";
import axios from "axios";
import * as constants from "./constants";
import Header from "./components/Header/Header";
import PostsList from "./components/PostsList/PostsList";
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
          postsOffset: prevState.postsOffset + 10,
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        <Header />
        <PostsList posts={posts} />
      </>
    );
  }
}

export default App;
