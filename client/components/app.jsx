import React from 'react';
import Forum from './forum';
import Header from './header';
import NewPost from './new-post';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: false,
      themedPost: [],
      themeView: [],
      posts: [],
      view: 'all'
    };
    this.setView = this.setView.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data)[0] === 'error') return;
        const innerObj2 = { all: data };
        this.setState({ themeView: innerObj2 });
        const all = [...data];
        const allTheme = all.map(x => x.theme);
        const uniqueThemes = Array.from(new Set(all.map(x => x.theme)))
          .map(theme => {
            return allTheme.find(x => x === theme);
          });
        const allObj = { all };
        const post = [];
        post.push(allObj);
        const newPost = {
          id: '',
          title: '',
          theme: '',
          content: ''
        };
        uniqueThemes.map(theme => {
          const uniqueThemeArray = Array.from(new Set(all.filter(x => x.theme === theme)));
          const obj = Object.create(newPost);
          obj[theme] = uniqueThemeArray;
          post.push(obj);
        });
        const innerObj = {};
        const innerArr = [];
        innerObj.new = data;
        innerArr.push(innerObj);
        // console.log('data:', data)
        // console.log('innerObj:', innerObj);
        // console.log('innerArr:', innerArr);
        this.setState({
          posts: innerArr,
          themedPost: post
        });
      });
  }

  setView(theme) {
    if (!theme || !this.state.themedPost) return;
    const themedPost = this.state.themedPost;
    const themeView = themedPost.filter(x => Object.keys(x)[0] === theme);
    // console.log('themeView:', themeView);
    this.setState({
      view: theme,
      themeView: themeView,
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
    // console.log('state.post:', this.state.posts)
    // console.log('state.themeView:', this.state.themeView)
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
              themedPost={this.state.themedPost}
              themeView={this.state.themeView}
              view={this.state.view}
            />
          </div>
          : <NewPost />
      }
    </div>;
  }
}

export default App;
