import React from 'react';
import ForumPost from './forum-post';
import NoPost from './no-post';

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedPostIs: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(postId) {
    if (this.state.openedPostIs === postId) {
      this.setState({
        openedPostIs: ''
      });
    } else {
      this.setState({
        openedPostIs: postId
      });
    }
  }

  render() {
    const postsArr = this.props.themeView;
    const posts = Object.values(postsArr);
    // console.log(posts[0]);
    if (posts[0].length === 0) {
      return <NoPost theme={this.state.openedPostIs}/>;
    } else {
      return (
        posts[0].map(x => {
          // console.log('x', x);
          const id = x.id;
          const post = x;
          return (
            <ForumPost
              openPost={this.handleClick}
              key={id}
              post={post}
              openedPostIs={this.state.openedPostIs}
              themedPost={this.props.themedPost}
            />
          );
        })
      );
    }
  }
}

export default Forum;
