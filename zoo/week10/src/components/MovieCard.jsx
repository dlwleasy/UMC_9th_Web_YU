// 영화 카드 컴포넌트
export default function MovieCard({ movie, onClick }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageImage =
    "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageImage
          }
          alt={movie.title || "영화 포스터"}
          onError={(e) => {
            e.target.src = fallbackImageImage;
          }}
        />
        {movie.vote_average > 0 && (
          <div className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{movie.release_date || "개봉일 미정"}</p>
        <p className="movie-overview">
          {movie.overview
            ? movie.overview.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview
            : "설명이 없습니다."}
        </p>
      </div>
    </div>
  );
}
