import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import './index.css'

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {


  state = {
    movies: [],
    searchQuery: ""
  }

  /*async componentDidMount(){
    const baseURL= "http://localhost:3002/movies" //npx json-server --watch src/api/movies.json --port 3002
    const response= await fetch(baseURL)
    console.log(response)
    const data = await response.json();
    console.log(data)
    this.setState({movies : data})
  }*/

  async componentDidMount() {
    this.getMovie();
  }

  async getMovie() {
    const response = await axios.get("http://localhost:3002/movies")
    this.setState({ movies: response.data })
  }

  /*deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id)
    this.setState(
      {
        movies: newMovieList
      })
  }*/

  //FETCH API
  /* deleteMovie = async (movie) => {
     const baseURL = `http://localhost:3002/movies/${movie.id}`
     await fetch(baseURL, {
       method: "DELETE"
     })
     const newMovieList = this.state.movies.filter(
       m => m.id !== movie.id)
     this.setState(
       {
         movies: newMovieList
       })
   }*/

  //AXIOS API
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id)
    this.setState(
      {
        movies: newMovieList
      })
  }


  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState(state => ({
      movies: state.movies.concat([movie])
    }))
    this.getMovie();
  }

  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
    this.getMovie();
  }

  render() {
    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
      }
    ).sort((a, b) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });
    return (
      <Router>

        <div className="container">
          <Route path="/" exact render={() => (
            <React.Fragment>
              <br></br>
              <div className="row">
                <div className="col-lg-12">
                  <SearchBar searchMovieProp={this.searchMovie} />
                </div>
              </div>

              <MovieList
                deleteMovieProps={this.deleteMovie}
                movies={filteredMovies} />
            </React.Fragment>
          )}>
          </Route>

          <Route path="/add" exact render={({ history }) => (
            <AddMovie
              onAddMovie={(movie) => {
                this.addMovie(movie);
                history.push("/")
              }}
            />
          )}>
          </Route>

          <Route path="/edit/:id" exact render={(props) => (
            <EditMovie
              {...props}
              onEditMovie={(id, movie) => {
                this.editMovie(id, movie);
              }}
            />
          )}>
          </Route>



        </div>
      </Router>
    )
  }
}





export default App;