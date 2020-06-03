import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.setTheme(event.target.name);
  }

  render() {
    return (
      <div className="header">
        <div className="header-name">
          <span className="name-label-span">your 2 cents</span>
        </div>
        <div className="navi-buttons">
          <form className="navi-theme-container">
            <button
              type="button"
              name="all"
              onClick={this.handleClick}
            >&#62;all</button>
            <button
              type="button"
              name="sports"
              onClick={this.handleClick}
            >&#62;sports</button>
            <button
              type="button"
              name="politics"
              onClick={this.handleClick}
            >&#62;politics</button>
            <button
              type="button"
              name="tv"
              onClick={this.handleClick}
            >&#62;tv</button>
            <button
              type="button"
              name="movies"
              onClick={this.handleClick}
            >&#62;movies</button>
            <button
              type="button"
              name="books"
              onClick={this.handleClick}
            >&#62;books</button>
            <button
              type="button"
              name="tech"
              onClick={this.handleClick}
            >&#62;tech</button>
            <button
              type="button"
              name="webdev"
              onClick={this.handleClick}
            >&#62;webdev</button>
            <button
              type="button"
              name="random"
              onClick={this.handleClick}
            >&#62;random</button>
          </form>
          <div className="navi-post">
            <button onClick={this.props.handleNewPost}>new post</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
