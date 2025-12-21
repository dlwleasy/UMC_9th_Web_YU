import React, { useState, useEffect } from "react";
import "./MovieSearchForm.css";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";

export default function MovieSearchForm() {
  // 상태 관리
  const [movieTitle, setMovieTitle] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Bearer 토큰 가져오기
  const token = import.meta.env.VITE_TMDB_TOKEN;

  // 초기 로딩 시 인기 영화 가져오기
  useEffect(() => {
    fetchPopularMovies();
  }, [language]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedMovie) {
        setSelectedMovie(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedMovie]);

  // 인기 영화 가져오기
  const fetchPopularMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("영화 데이터를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setMovies(data.results);
      console.log("인기 영화:", data.results);
    } catch (error) {
      console.error("영화 로딩 오류:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 제출 핸들러 (영화 검색)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieTitle.trim()) {
      fetchPopularMovies();
      return;
    }

    setIsLoading(true);
    setError(null);

    const searchParams = new URLSearchParams({
      //// 직접 변수를 URL에
      //const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&language=${language}&page=1`;
      query: movieTitle,
      language: language,
      include_adult: includeAdult,
      page: 1,
    });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?${searchParams}`, //Query String이용하기 ?를 기준으로 값구별하고 나머지는 param으로!
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("검색에 실패했습니다.");
      }

      const data = await response.json();
      setMovies(data.results);
      console.log("검색 결과:", data.results);
    } catch (error) {
      console.error("검색 오류:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 영화 카드 클릭 핸들러
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-search-container">
      {/* 검색 폼 */}
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <div className="top-row">
            {/* 영화 제목 입력 */}
            <div className="form-section">
              <label className="form-label">
                <span className="label-icon">🎬</span>
                영화 제목
              </label>
              <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="영화 제목을 입력하세요"
                className="form-input"
              />
            </div>

            {/* 옵션 (성인 콘텐츠) */}
            <div className="form-section">
              <label className="form-label">
                <span className="label-icon">⚙️</span>
                옵션
              </label>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="includeAdult"
                  checked={includeAdult}
                  onChange={(e) => setIncludeAdult(e.target.checked)}
                  className="checkbox-input"
                />
                <label htmlFor="includeAdult" className="checkbox-label">
                  성인 콘텐츠 포함
                </label>
              </div>
            </div>
          </div>

          {/* 언어 선택 */}
          <div className="language-section">
            <label className="form-label">
              <span className="label-icon">🌐</span>
              언어
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select"
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
          </div>

          {/* 검색 버튼 */}
          <button type="submit" className="search-button" disabled={isLoading}>
            <span>🔍</span>
            {isLoading ? "검색 중..." : "검색하기"}
          </button>
        </form>
      </div>

      {/* 에러 메시지 */}
      {error && <div className="error-message">⚠️ {error}</div>}

      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>영화를 불러오는 중...</p>
        </div>
      )}

      {/* 영화 목록 */}
      {!isLoading && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      )}

      {/* 검색 결과 없음 */}
      {!isLoading && movies.length === 0 && !error && (
        <div className="no-results">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}

      {/* 영화 상세 모달 */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
