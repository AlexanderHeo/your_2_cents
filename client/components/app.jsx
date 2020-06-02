import React from 'react';
import Forum from './forum';
import Header from './header';
import NewPost from './new-post';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      view: 'all'
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data
        });
      });
  }

  setView(theme) {
    if (!theme) return;
    this.setState({
      view: theme,
      newPost: false
    });
  }

  handleNewPost() {
    this.setState({
      newPost: true
    });
  }

  render() {
    if (this.state.posts.length === 0) return null;
    return <div className="container">
      <Header
        setView={this.setView}
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
