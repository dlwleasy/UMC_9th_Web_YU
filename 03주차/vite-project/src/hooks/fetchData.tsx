import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";


function useFetch(PageNum:number|undefined) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isPending, setPending] = useState(false)
    const [isError, setError] = useState(false)
    


    useEffect(() => {
    const fetchMovies = async () => {
      try {
        setPending(true);
        const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${PageNum}`,
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
  }, [PageNum]);
  return {movies, isPending, isError}
}

export default useFetch

function fetchLP() {
  
}