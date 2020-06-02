import React from 'react';

function NoPost(props) {
  // console.log(props);
  return (
    <div className="container">
      <div className="no-post">
        <span>hmmmmm, there were no posts on {`${props.theme}`}. why not be the first to post something on {`${props.theme}`}?</span>
      </div>
    </div>
  );
}

export default NoPost;
