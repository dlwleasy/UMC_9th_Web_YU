import axios from "axios";
import { useEffect, useState } from "react";
import type { MovieCredit, MovieCreditResponse } from '../types/movies';
import { useParams } from "react-router-dom";


export const MovieDetailPage = () => {
    const {movieId} = useParams()
    const [Details,setDetails] = useState<MovieCredit[]>([])
    useEffect(() => {
    const fetchMoviesDetail = async () => {
      try {
        
        const { data } = await axios.get<MovieCreditResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTI4ZjdlMGFhMDE1YWIzNDM5MjU2ZjMyMzE3YzZjNyIsIm5iZiI6MTc1OTQ4NTgwOS43Mjg5OTk5LCJzdWIiOiI2OGRmOWY3MTE5NThjZTAwNzM0YzY3MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mACp1NDgMWWsPGg2zqDS431cB0NTx6VYyGyVl-IBMd8`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setDetails(data.cast);
      } catch {
        
      } finally {
        
      }}
      fetchMoviesDetail()},[movieId])
      return (
        <main className="MovieInfo_container">
            <header>
                <section className="MovieInfo">
                    <h1><strong></strong></h1>
                    <h4></h4>
                    <textarea></textarea>
                </section>
                <section className="MovieThrailer" id={movieId}>
                    <video></video>
                </section>
            </header>
            <div className="CharacterInMovie_container">
              <main className="CharacterInMovie">
                {Details.map((detail) => (
                    <article>
                      <img src={`https://image.tmdb.org/t/p/w500/${detail.profile_path}`} className="Act_img">
                      </img>
                      <div>{detail.name}</div>
                    </article>))}
              </main>
            </div>
            
        </main>
    )}