
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MovieList from './MovieList'


const Search = () => {
    const [searchText, setSearchText] = useState("")
    const [movieArray, setMovieArray] = useState([])

    // Search for movie with inputted text
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
            );

            setMovieArray(data.results.map(movie => [movie.title, movie.id]))

        } catch (error) {
            console.error(error);
        };

    }

    // eslint-disable-next-line 
    useEffect(() => { fetchSearch() }, []);

    return (
        <div>
            <TextField label="Movie Title" style={{ width: '70%' }} variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <Button
                onClick={fetchSearch}
                variant="contained"
                style={{ margin: 4, padding: 10 }}
            >
                Search
            </Button>
            <MovieList movieArray={movieArray} setSearchText={setSearchText} />
        </div>
    );
}

export default Search;
