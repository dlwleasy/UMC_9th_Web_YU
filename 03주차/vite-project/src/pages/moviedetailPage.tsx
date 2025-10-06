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
            Authorization: `비밀`,
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
