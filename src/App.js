import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=e54c1a1e'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        let data
        if (title) {
            console.log('here')
            const response = await fetch(`${API_URL}&s=${title}`)
            data = await response.json()
        } else {
            console.log('other here')
            const response = await fetch({ API_URL })
            data = await response.json()
            console.log(data)
        }

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('')
    }, [])

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    )
}

export default App
