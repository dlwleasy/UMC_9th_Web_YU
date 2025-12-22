import type { Movie, MovieSearchResponse } from '../types/movies';
import axios from 'axios'

export const fetchMovieData = async (title:string, adult:boolean=false, language:string='en-US') => {
        
        const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=${adult}&language=${language}&page=1`

        const headers = {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTI4ZjdlMGFhMDE1YWIzNDM5MjU2ZjMyMzE3YzZjNyIsIm5iZiI6MTc1OTQ4NTgwOS43Mjg5OTk5LCJzdWIiOiI2OGRmOWY3MTE5NThjZTAwNzM0YzY3MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mACp1NDgMWWsPGg2zqDS431cB0NTx6VYyGyVl-IBMd8`,
            }
        const res = await axios.get<MovieSearchResponse>(movieSearchUrl,{headers})
        console.log('키워드 기반 찾은 값:\n',res)
        return res
        }

import { useState } from "react";


function Open_Close() {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    // 모달을 여는 함수: 클릭한 영화의 데이터를 인자로 받습니다.
    const handleOpenModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    // 모달을 닫는 함수
    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return {selectedMovie, handleCloseModal, handleOpenModal}
}

export default Open_Close