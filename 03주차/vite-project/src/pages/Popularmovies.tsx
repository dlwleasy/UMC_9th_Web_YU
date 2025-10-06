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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTI4ZjdlMGFhMDE1YWIzNDM5MjU2ZjMyMzE3YzZjNyIsIm5iZiI6MTc1OTQ4NTgwOS43Mjg5OTk5LCJzdWIiOiI2OGRmOWY3MTE5NThjZTAwNzM0YzY3MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mACp1NDgMWWsPGg2zqDS431cB0NTx6VYyGyVl-IBMd8`, // 본인 TMDB 토큰으로 교체
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