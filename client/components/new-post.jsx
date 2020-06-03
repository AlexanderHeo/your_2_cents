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
      <div className="form">
        <div className="form-section">
          <label htmlFor="title"><span>title</span></label>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="theme"><span>theme</span></label>
          <select
            type="text"
            name="theme"
            value={this.state.theme}
            onChange={this.handleChange}
          >
            <option value="default"></option>
            <option value="all">all</option>
            <option value="sports">sports</option>
            <option value="politics">politics</option>
            <option value="tv">tv</option>
            <option value="movies">moves</option>
            <option value="books">books</option>
            <option value="tech">tech</option>
            <option value="webdev">webdev</option>
            <option value="random">random</option>
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="content"><span>your 2 cents</span></label>
          <textarea
            type="text"
            placeholder="2 cents"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            rows="15"
          ></textarea>
        </div>
        <div className="form-section-button">
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
    );
  }
}

export default NewPost;
