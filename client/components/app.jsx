import React from 'react';
import Forum from './forum';
import Header from './header';
import NewPost from './new-post';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: false,
      view: 'all'
    };
    this.setTheme = this.setTheme.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        this.setState({ posts: data });
      });
  }

  setTheme(theme) {
    if (!theme) return;
    let themeId = '';
    switch (theme) {
      case 'all': themeId = '1';
        break;
      case 'sports': themeId = '2';
        break;
      case 'politics': themeId = '3';
        break;
      case 'tv': themeId = '4';
        break;
      case 'movies': themeId = '5';
        break;
      case 'books': themeId = '6';
        break;
      case 'tech': themeId = '7';
        break;
      case 'webdev': themeId = '8';
        break;
      case 'random': themeId = '9';
        break;
      default: themeId = '1';
    }
    fetch(`/api/posts/${themeId}`)
      .then(res => res.json())
      .then(data => {
        !data
          ? this.setState({ posts: [] })
          : this.setState({ posts: data });
      });

    this.setState({
      view: theme,
      newPost: false
    });
  }

  handleNewPost() {
    this.setState({ newPost: true });
  }

  render() {
    if (this.state.posts.length === 0) return null;
    return <div className="container">
      <Header
        setTheme={this.setTheme}
        handleNewPost={this.handleNewPost}
      />
      {
        !this.state.newPost
          ? <div className="main">
            <Forum
              posts={this.state.posts}
              view={this.state.view}
            />
          </div>
          : <NewPost />
      }
    </div>;
  }
}

export default App;
