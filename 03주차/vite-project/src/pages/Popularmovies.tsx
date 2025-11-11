import { useState, useContext } from 'react';
import {MoviesContext} from '../context/moviesContext'
import LodingSpinner from '../components/LodingSpinner'
import { Link } from 'react-router-dom';
import useFetch from '../hooks/fetchData'


const PopularMoviesPage = () => {
  const [isHovered, setHover] = useState<any>(false)
  const context = useContext(MoviesContext)
  const {movies, isPending, isError} = useFetch(context?.PageNum)


  if (isPending) {
    return (
      <LodingSpinner></LodingSpinner>
    )
  }
  if (isError) {
    return (
      <div>데이터 불러오는 중 오류 발생</div>
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
              <p className='SimpleMovieInfo'>
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