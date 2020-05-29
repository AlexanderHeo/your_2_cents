import React from 'react';

class ForumPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        all: [],
        sport: [],
        politics: [],
        tv: [],
        movies: [],
        books: [],
        tech: [],
        webdev: [],
        random: []
      }
    };
  }

  // componentDidMount(props) {
  //   const themedPost = this.props.post;
  // console.log(themedPost)
  // themedPost.map(posts => {
  //   const post = Object.keys(posts);
  //   this.setState({
  //     posts: post
  //   });
  // });
  // }

  render() {
    if (!this.props.post) return null;
    const id = this.props.post.id;
    const openedPostIs = this.props.openedPostIs;
    if (openedPostIs === id) {
      return <Open
        post={this.props.post}
        openPost={this.props.openPost}
      />;
    } else {
      const post = this.props.post;
      const id = post.id;
      const title = post.title;
      const theme = post.theme;
      const content = post.content;
      return (
        <div className="post-container">
          <div className="post-title">
            <div className="title">
              <span>{title}</span>
            </div>
            <div className="theme">
              <span>&#62;{theme}</span>
            </div>
          </div>
          <div className="content">
            <div
              className="content-clamp"
              onClick={() => this.props.openPost(id)}
            >
              <div>{content}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function Open(props) {
  const post = props.post;
  const id = post.id;
  const title = post.title;
  const theme = post.theme;
  const content = post.content;
  return (
    <div className="post-container-open">
      <div className="post-title">
        <div className="title">
          <span>{title}</span>
        </div>
        <div className="theme">
          <span>-{theme}</span>
        </div>
      </div>
      <div className="content-open">
        <div
          className="content-clamp-open"
          onClick={() => props.openPost(id)}
        >
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default ForumPost;
