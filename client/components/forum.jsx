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
    const posts = this.props.posts;
    if (posts.length === 0) {
      return <NoPost theme={this.state.openedPostIs}/>;
    } else {
      return (
        posts.map(x => {
          const id = x.postId;
          return (
            <ForumPost
              openPost={this.handleClick}
              key={id}
              post={x}
              openedPostIs={this.state.openedPostIs}
            />
          );
        })
      );
    }
  }
}

export default Forum;
