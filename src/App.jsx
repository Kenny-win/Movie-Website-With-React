import {useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=f10f6894';

const movie1 = {
    "Title": "Spider-Man",
    "Year": "2002",
    "imdbID": "tt0145487",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
}

const App = ()=>{
    let title = '';
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies(searchTerm);
    },[searchTerm]);

    return(
        <div className="app">
            <h1>Pilem Biken Pusink</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search" 
                    onClick={()=>
                        searchMovies(searchTerm)
                    }
                />
            </div>

            {movies?.length > 0?
                (
                    <div className="container">
                        {movies.map((movie)=>(<MovieCard movie1={movie} />))}
                    </div>
                ):(
                    <div className="empty">
                        <h2>no movie found</h2>
                    </div>
                )
            }

            {/* <div className="container">
                <MovieCard movie1={movie1} />
            </div> */}
        </div>
    );
}

export default App;