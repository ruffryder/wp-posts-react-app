import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import * as constants from "./constants";
import Header from "./components/Header/Header";
import PostsList from "./components/PostsList/PostsList";
import Button from "./components/UI/Button/Button";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import PostsDetailsList from "./components/PostsDetailsList/PostsDetailsList";

/* eslint-disable no-console */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postsOffset: constants.POSTS_OFFSET,
      showLoadMorePostsButton: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { postsOffset } = this.state;
    this.setState({
      showLoadMorePostsButton: false,
      isLoading: true,
    });
    axios
      .get(
        `https://renemorozowich.com/wp-json/wp/v2/posts?_embed&per_page=${constants.POSTS_PER_PAGE}&offset=${postsOffset}`,
      )
      .then((res) => {
        /* Check how many posts were returned and
        show Load more posts button only if there are more left */
        const returnedPosts = res.data.length;
        this.setState((prevState) => ({
          posts: res.data,
          postsOffset: prevState.postsOffset + constants.POSTS_OFFSET,
          showLoadMorePostsButton: returnedPosts === constants.POSTS_PER_PAGE,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  handleLoadMorePosts = () => {
    const { postsOffset } = this.state;
    this.setState({ showLoadMorePostsButton: false, isLoading: true });
    axios
      .get(
        `https://renemorozowich.com/wp-json/wp/v2/posts?_embed&per_page=${constants.POSTS_PER_PAGE}&offset=${postsOffset}`,
      )
      .then((res) => {
        /* Check how many posts were returned and
      show Load more posts button only if there are more left */
        const returnedPosts = res.data.length;
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...res.data],
          postsOffset: prevState.postsOffset + constants.POSTS_OFFSET,
          showLoadMorePostsButton: returnedPosts === constants.POSTS_PER_PAGE,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { posts, showLoadMorePostsButton, isLoading } = this.state;
    return (
      <>
        <div className="container">
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <PostsList posts={posts} />
                  {showLoadMorePostsButton ? (
                    <Button
                      textValue="Load more posts"
                      clickHandler={this.handleLoadMorePosts}
                    />
                  ) : null}
                </>
              )}
            />
            <Route path="/post/:id" component={PostsDetailsList} />
          </Switch>
          {isLoading ? <LoadingSpinner /> : null}
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
