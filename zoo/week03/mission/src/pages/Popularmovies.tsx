import { useEffect, useState, useContext } from 'react';
import type { Movie, MovieResponse } from '../types/movies';
import {MoviesContext} from '../context/moviesContext'
import axios from 'axios';
import LodingSpinner from '../components/LodingSpinner'
import { Link } from 'react-router-dom';


const PopularMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isHovered, setHover] = useState<any>(false)
  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState(false)
  const context = useContext(MoviesContext)



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setPending(true);
        const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${context?.PageNum}`,
        {
          headers: {
            Authorization: `비밀`,
          },
        }
      );
      setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setPending(false);
      }

    };

    fetchMovies();
  }, [context?.PageNum]);

  if (isPending) {
    return (
      <LodingSpinner></LodingSpinner>
    )
  }

  return (
    <div className='main_contents'>
      <main className='movies_container'>
        {movies.map((movie) => (
          <Link to={`/popularMovies/${movie.id}`}>
            <article className='movie_info' key={movie.id}
              onMouseEnter={():void => setHover(movie.id)}
              onMouseLeave={():void => setHover(false)}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  key={movie.id} className='movie_info-img'></img>
              {isHovered == movie.id && (
              <p>
                <strong>{movie.title}</strong><br></br>
                {movie.overview}
              </p>)}
            </article>
          </Link>

        ))}
      </main>
    </div>

  );
};

export default PopularMoviesPage;