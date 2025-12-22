import { useState, type ChangeEvent } from 'react';
import { fetchMovieData } from '../components/fetch';
import Open_Close from '../components/fetch'
import { type Movie } from '../types/movies';
import { MovieCard } from '../components/moviecard';


export const Pages = () => {
    const [language, setLanguage] = useState("ko-KR");
    const [isAdult, setIsAdult] = useState(true);
    const [title, setTitle] = useState<string>("");
    
    // 1. 검색 결과를 저장할 상태 추가
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAdult(e.target.checked);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 2. 검색 실행 함수
    const onSearch = async () => {
        try {
            const res = await fetchMovieData(title, isAdult, language);
            // Axios 응답 객체에서 data.results만 뽑아서 상태에 저장
            setMovies(res.data.results); 
            console.log("저장된 영화 목록:", res.data.results);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

    const {selectedMovie, handleCloseModal, handleOpenModal} = Open_Close()
    console.log('모달 열림, 닫힘 여부:',selectedMovie)

    return (
        <div className="container">
            <header className="search-card">
                <div className="input-group-row">
                    <div className="input-field">
                        <label>🎬 영화 제목</label>
                        <input type="text" placeholder="영화 제목을 입력하세요" value={title} onChange={handleChangetitle} />
                    </div>
                    <div className="input-field">
                        <label>⚙️ 옵션</label>
                        <div className="checkbox-wrapper">
                            <input type="checkbox" id="adult" checked={isAdult} onChange={handleCheck} />
                            <label htmlFor="adult">성인 콘텐츠 표시</label>
                        </div>
                    </div>
                </div>
                
                <div className="input-field">
                    <label>🌐 언어</label>
                    <select value={language} onChange={handleChange}>
                        <option value={'ko'}>한국어</option>
                        <option value={'en-US'}>영어</option>
                    </select>
                </div>

                <button className="search-btn" onClick={onSearch}>🔍 검색하기</button>
            </header>

            <main className="movie-grid">
                {/* 3. 데이터가 있을 때만 map으로 카드 생성 */}
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className="movie-card" key={movie.id} onClick={()=>handleOpenModal(movie)}>
                            <div className="poster-wrapper">
                                <img 
                                    src={movie.poster_path 
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                                        : "https://via.placeholder.com/300x450?text=No+Image"} 
                                    alt={movie.title} 
                                />
                                <span className="rating">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p className="release-date">{movie.release_date}</p>
                                <p className="description">{movie.overview || "줄거리 정보가 없습니다."}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', gridColumn: '1/-1'}}>검색 결과가 없습니다.</p>
                )}
                {selectedMovie && <MovieCard title={selectedMovie.title} closeModal={handleCloseModal} release_date={selectedMovie.release_date} story_line={selectedMovie.overview} poster_path={selectedMovie.poster_path} movieID={title} subposter_path={selectedMovie.backdrop_path}></MovieCard>}
            </main>
        </div>
    );
};