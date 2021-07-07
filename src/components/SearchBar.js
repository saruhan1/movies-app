import React from 'react';
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {

  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>

        <div className="row">
          <div className="col-10">
            <input type="text" onChange={this.props.searchMovieProp} className="form-control" placeholder="Search a movie.." />
          </div>
          <div className="col-2">
            <Link to="/add" type="button" className="btn btn-md btn-primary" style={{ float: "right" }}>Add Movie</Link>
          </div>
        </div>
        <br></br>
      </form>
    )
  }
}

export default SearchBar;