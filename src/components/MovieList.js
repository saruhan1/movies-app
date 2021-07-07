import React from 'react';
import {Link} from 'react-router-dom'
import './index.css'

const MovieList = (props) => {

const truncateOverview = (string , maxLength) =>{
  if(!string) return null;
  if(string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
}

  return (
    <div className="row">
      {props.movies.map((movie) => (
        <div className="col-lg-3" key={movie.id}>
          <div className="card mb-4 shadow-sm">
            <img src={movie.imageURL} alt=".." className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">{truncateOverview(movie.overview, 200)}</p>
              <div className="d-flex justify-content-between align-items-center">
                <button onClick={ (event) => props.deleteMovieProps(movie)} type="button" className="btn btn-md btn-outline-danger">Delete</button>
                <Link type="button"
                className="btn btn-md btn-outline-primary"
                style={{marginLeft:"-40px"}}
                to= {`edit/${movie.id}`}
                >
                  Edit
                </Link>
                
                <button type="button" class="btn btn-dark btn-lg" disabled>{movie.rating}</button> 
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList;