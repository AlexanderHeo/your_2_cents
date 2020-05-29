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
    fetch('/api/grades')
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
        const innerObj = { all: data };
        this.setState({
          posts: innerObj,
          themedPost: post
        });
      });
  }

  setView(theme) {
    if (!theme || !this.state.themedPost) return;
    this.setState({
      view: theme
    });
    const themedPost = this.state.themedPost;
    const themeView = themedPost.filter(x => Object.keys(x)[0] === theme);
    // console.log('themeView in setView:', themeView)
    const themeViewOnly = Object.values(themeView);
    // console.log('themeView:', themeView);
    // console.log('themeViewOnly:', themeViewOnly);
    this.setState({
      themeView: {
        [theme]: themeViewOnly
      },
      // themeView: [themeView],
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
