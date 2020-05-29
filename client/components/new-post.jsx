import React from 'react';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      theme: '',
      content: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <div className="form-section">
            <label htmlFor="title">title</label>
            <input
              type="text"
              placehodler="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-section">
            <label htmlFor="theme">theme</label>
            <input
              type="text"
              placeholder="theme"
              name="theme"
              value={this.state.theme}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-section">
            <label htmlFor="content">your 2cents</label>
            <input
              type="text"
              placeholder="content"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-section">
            <button
              type="submit"
              name="submit"
              className="button"
            >submit</button>
            <button
              type="submit"
              name="cancel"
              className="button"
            >cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
