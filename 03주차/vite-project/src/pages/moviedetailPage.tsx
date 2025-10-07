import axios from "axios";
import { useEffect, useState } from "react";
import type { MovieCredit, MovieCreditResponse, MovieDetails, MovieVideo, MovieVideoResponse, } from '../types/movies';
import { useParams } from "react-router-dom";


export const MovieDetailPage = () => {
    //url /: 사용
    const {movieId} = useParams()
    //상태로 관리
    const [Credits,setCredit] = useState<MovieCredit[]>([])
    const [Videos, setViedo] = useState<MovieVideo>()
    const [Details, setDetails] = useState<MovieDetails>()

    useEffect(()=>{
      const fetchMovieDatas = async () => {
        if (!movieId) return;
        const MovieCreditsURL= `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
        const TrailerVideoURL = `https://api.themoviedb.org/3/movie/${movieId}/videos`
        const MovieDetailURL = `https://api.themoviedb.org/3/movie/${movieId}`

        const headers = {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTI4ZjdlMGFhMDE1YWIzNDM5MjU2ZjMyMzE3YzZjNyIsIm5iZiI6MTc1OTQ4NTgwOS43Mjg5OTk5LCJzdWIiOiI2OGRmOWY3MTE5NThjZTAwNzM0YzY3MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mACp1NDgMWWsPGg2zqDS431cB0NTx6VYyGyVl-IBMd8`,
            };
        try {
          const [CreditsResponse, TrailerResponse, DetailsResponse] = await Promise.all([
            axios.get<MovieCreditResponse>(MovieCreditsURL,{headers}),
            axios.get<MovieVideoResponse>(TrailerVideoURL,{headers}),
            axios.get<MovieDetails>(MovieDetailURL,{headers})
          ])
          setCredit(CreditsResponse.data.cast)
          setDetails(DetailsResponse.data)
          const foundTrailer = TrailerResponse.data.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
          );
          setViedo(foundTrailer)
          
        }catch(e){
          console.error('Failed to fetch the movie data:', e)
        }
      }
      fetchMovieDatas()
    },[movieId])
      return (
        <main className="MovieInfo_container">
            <header>
                <section className="MovieInfo">
                    <h1><strong>{Details?.title}</strong></h1><br></br>
                    <h4>Runtime : {Details?.runtime} minute</h4><br></br>
                    <h5>popularity : {Details?.popularity}</h5><br></br>
                    <p id={movieId}>Overview : {Details?.overview}</p>
                </section>
                <section className="MovieThrailer" id={movieId}>
                    <iframe src={`https://www.youtube.com/embed/${Videos?.key}`}></iframe>
                </section>
            </header>
            <div className="CharacterInMovie_container">
              <header className="CharacterInMovie_title"><strong>Drector/Stars</strong></header>
              <main className="CharacterInMovie">
                {Credits.map((credit) => (
                    <article key={credit.id}>
                      <img src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`} className="Act_img">
                      </img>
                      <div>{credit.name}</div>
                    </article>))}
              </main>
            </div>
            
        </main>
    )}